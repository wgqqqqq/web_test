import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RubiksCube3DProps {
  explodeProgress: number; // 0-1
}

export default function RubiksCube3D({ explodeProgress }: RubiksCube3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    cubes: THREE.Group[];
    cubeGroup: THREE.Group;
    animationId: number;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    hoveredCube: THREE.Group | null;
    handleMouseMove: (event: MouseEvent) => void;
    handleResize: () => void;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let cleanupCalled = false;
    let initFrameId: number | null = null;

    const initScene = () => {
      if (cleanupCalled) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // 如果尺寸无效，延迟重试
      if (width === 0 || height === 0) {
        initFrameId = requestAnimationFrame(initScene);
        return;
      }

      // 创建场景
      const scene = new THREE.Scene();

      // 创建相机
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.set(2, 0.5, 10);

      // 创建渲染器
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Raycaster 用于悬停检测
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      // 创建魔方组
      const cubeGroup = new THREE.Group();
      scene.add(cubeGroup);

      // 创建材质的工厂函数
      const createMaterials = () => [
        new THREE.MeshBasicMaterial({ color: 0x3a3a42, transparent: true, opacity: 0.4 }),
        new THREE.MeshBasicMaterial({ color: 0x2d2d35, transparent: true, opacity: 0.35 }),
        new THREE.MeshBasicMaterial({ color: 0x42424a, transparent: true, opacity: 0.45 }),
        new THREE.MeshBasicMaterial({ color: 0x252530, transparent: true, opacity: 0.3 }),
        new THREE.MeshBasicMaterial({ color: 0x35353d, transparent: true, opacity: 0.4 }),
        new THREE.MeshBasicMaterial({ color: 0x2a2a32, transparent: true, opacity: 0.35 }),
      ];

      // 边框材质
      const createEdgeMaterial = () => new THREE.LineBasicMaterial({
        color: 0x64b4ff,
        opacity: 0.15,
        transparent: true,
      });

      const cubes: THREE.Group[] = [];
      const positions = [-1, 0, 1];
      const cubeSize = 0.75;
      const gap = 0.85;

      positions.forEach(x => {
        positions.forEach(y => {
          positions.forEach(z => {
            const cubeUnit = new THREE.Group();

            // 立方体
            const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
            const cubeMaterials = createMaterials();
            const cube = new THREE.Mesh(geometry, cubeMaterials);
            cubeUnit.add(cube);

            // 边框
            const edgeGeometry = new THREE.EdgesGeometry(geometry);
            const edgeMaterial = createEdgeMaterial();
            const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
            cubeUnit.add(edges);

            // 设置位置
            cubeUnit.position.set(x * gap, y * gap, z * gap);
            
            // 存储基础数据 - 规律爆炸方向（从中心向外）
            cubeUnit.userData = { 
              baseX: x * gap, 
              baseY: y * gap, 
              baseZ: z * gap,
              // 爆炸方向就是位置本身（从中心向外）
              dirX: x,
              dirY: y,
              dirZ: z,
              // 存储原始材质透明度
              baseOpacities: cubeMaterials.map(m => m.opacity),
              baseEdgeOpacity: 0.15,
              isHovered: false,
            };

            cubeGroup.add(cubeUnit);
            cubes.push(cubeUnit);
          });
        });
      });

      // 初始旋转
      cubeGroup.rotation.x = -0.35;
      cubeGroup.rotation.y = -0.8;
      
      // 根据容器高度偏移魔方组，让它在首屏居中
      const updateCubeGroupPosition = () => {
        const containerHeight = container.clientHeight;
        const vh = window.innerHeight;
        if (containerHeight <= vh) {
          cubeGroup.position.y = 0;
          return;
        }
        // 小幅偏移，让魔方在首屏居中
        const offsetRatio = (containerHeight - vh) / containerHeight;
        cubeGroup.position.y = offsetRatio * 1.5; // 减小偏移系数
      };
      updateCubeGroupPosition();

      let hoveredCube: THREE.Group | null = null;

      // 鼠标移动处理
      const handleMouseMove = (event: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      };

      container.addEventListener('mousemove', handleMouseMove);

      // 动画
      let angle = -0.8;
      const animate = () => {
        if (cleanupCalled) return;
        
        angle += 0.003;
        cubeGroup.rotation.y = angle;

        // 悬停检测
        raycaster.setFromCamera(mouse, camera);
        const meshes = cubes.map(c => c.children[0] as THREE.Mesh);
        const intersects = raycaster.intersectObjects(meshes);

        // 重置之前悬停的方块
        if (hoveredCube && (!intersects.length || intersects[0].object.parent !== hoveredCube)) {
          const { baseEdgeOpacity } = hoveredCube.userData;
          hoveredCube.userData.isHovered = false;
          const edges = hoveredCube.children[1] as THREE.LineSegments;
          (edges.material as THREE.LineBasicMaterial).opacity = baseEdgeOpacity;
          (edges.material as THREE.LineBasicMaterial).color.setHex(0x64b4ff);
          hoveredCube = null;
        }

        // 设置新的悬停方块
        if (intersects.length > 0) {
          const newHovered = intersects[0].object.parent as THREE.Group;
          if (newHovered !== hoveredCube) {
            hoveredCube = newHovered;
            hoveredCube.userData.isHovered = true;
            const edges = hoveredCube.children[1] as THREE.LineSegments;
            (edges.material as THREE.LineBasicMaterial).opacity = 0.6;
            (edges.material as THREE.LineBasicMaterial).color.setHex(0x64b4ff);
          }
        }

        renderer.render(scene, camera);
        sceneRef.current!.animationId = requestAnimationFrame(animate);
      };

      // 响应窗口大小变化
      const handleResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        updateCubeGroupPosition();
      };
      window.addEventListener('resize', handleResize);

      sceneRef.current = {
        scene,
        camera,
        renderer,
        cubes,
        cubeGroup,
        animationId: 0,
        raycaster,
        mouse,
        hoveredCube: null,
        handleMouseMove,
        handleResize,
      };

      animate();
    };

    // 使用 requestAnimationFrame 延迟初始化，确保布局完成
    initFrameId = requestAnimationFrame(initScene);

    return () => {
      cleanupCalled = true;
      if (initFrameId !== null) {
        cancelAnimationFrame(initFrameId);
      }
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        window.removeEventListener('resize', sceneRef.current.handleResize);
        container.removeEventListener('mousemove', sceneRef.current.handleMouseMove);
        sceneRef.current.renderer.dispose();
        if (sceneRef.current.renderer.domElement.parentNode === container) {
          container.removeChild(sceneRef.current.renderer.domElement);
        }
        sceneRef.current = null;
      }
    };
  }, []);

  // 更新爆炸效果 - 规律向外扩散
  useEffect(() => {
    if (!sceneRef.current) return;
    
    const { cubes } = sceneRef.current;
    const explodeDistance = 3;

    cubes.forEach((cubeUnit) => {
      const { baseX, baseY, baseZ, dirX, dirY, dirZ, baseOpacities, baseEdgeOpacity, isHovered } = cubeUnit.userData;
      
      // 规律爆炸 - 沿着从中心向外的方向
      cubeUnit.position.x = baseX + dirX * explodeProgress * explodeDistance;
      cubeUnit.position.y = baseY + dirY * explodeProgress * explodeDistance;
      cubeUnit.position.z = baseZ + dirZ * explodeProgress * explodeDistance;
      
      // 散开时轻微旋转
      cubeUnit.rotation.x = dirX * explodeProgress * 0.3;
      cubeUnit.rotation.y = dirY * explodeProgress * 0.3;
      
      // 透明度变化
      cubeUnit.children.forEach((child) => {
        if (child instanceof THREE.Mesh && Array.isArray(child.material)) {
          child.material.forEach((mat, i) => {
            mat.opacity = baseOpacities[i] * (1 - explodeProgress * 0.6);
          });
        }
        if (child instanceof THREE.LineSegments) {
          const edgeMat = child.material as THREE.LineBasicMaterial;
          // 悬停时保持高亮，否则正常透明度
          if (!isHovered) {
            edgeMat.opacity = baseEdgeOpacity * (1 - explodeProgress * 0.5);
          }
        }
      });
    });
  }, [explodeProgress]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        inset: 0,
      }}
    />
  );
}
