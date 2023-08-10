import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { useState, useRef, Suspense, useLayoutEffect } from 'react';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { TextureLoader } from 'expo-three';
import { useAnimatedSensor, SensorType } from 'react-native-reanimated';

function Box(props) {
	const [active, setActive] = useState(false);
	const mesh = useRef();

	useFrame((state, delta) => {
		if (active) {
			mesh.current.rotation.x += delta;
			mesh.current.rotation.y += delta;
		}
	});

	return (
		<mesh {...props}
			scale={active ? 1.5 : 1}
			onClick={(event) => setActive(!active)}
			ref={mesh}
		>
			<boxGeometry />
			<meshStandardMaterial color={active ? 'green' : 'gray'} />
		</mesh>
	);
}

function Shoe(props) {

	const mesh = useRef();
	const [base, normal, rough] = useLoader(TextureLoader, [
		require('../assets/Airmax/textures/BaseColor.jpg'),
		require('../assets/Airmax/textures/Normal.jpg'),
		require('../assets/Airmax/textures/Roughness.png'),
	])
	const material = useLoader(MTLLoader, require('../assets/Airmax/shoe.mtl'));

	const obj = useLoader(
		OBJLoader,
		require('../assets/Airmax/shoe.obj'),
		(loader) => {
			material.preload();
			loader.setMaterials(material);
		}
	);

	useFrame((state, delta) => {
		let { x, y, z } = props.animatedSensor.sensor.value;
		x = ~~(x * 100) / 3000;
		y = ~~(y * 100) / 3000;
		mesh.current.rotation.x += x;
		mesh.current.rotation.y += y;
	});

	useLayoutEffect(() => {
		obj.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.material.map = base;
				child.material.normalMap = normal;
				child.material.roughnessMap = rough;
			}
		})
	}, [obj])

	return (
		<mesh
			ref={mesh}
			rotation={[0.7, 0, 0]}
		>
			<primitive object={obj} scale={15}
			/>
		</mesh>
	);
}

export default function ProductDetailsScreen() {
	const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
		interval: 100,
	});
	return (
		<Canvas>
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<Suspense fallback={null}>
				<Shoe animatedSensor={animatedSensor} />
			</Suspense>
			{/* <Box />
			<Box position={[0, 2, 0]} />
			<Box position={[0, -2, 0]} />

			<mesh scale={0.1}>
				<torusKnotGeometry radius={10} args={[10, 1, 260, 6, 10, 16]} />
				<meshStandardMaterial color={'green'} />
			</mesh> */}
		</Canvas>
	);
}