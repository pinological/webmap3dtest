import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, useGLTF, Sky, Grid, Stats, Text , Billboard} from "@react-three/drei"
import {Leva, useControls} from 'leva'
import { useEffect, useMemo, useRef, useState } from "react"
import { gsap } from "gsap/gsap-core"
import * as THREE from 'three'

//load model
function LoadModel(){
    const {scene} = useGLTF('/model/mainArea.glb')
    return (
        <primitive object={scene} scale={1}/>
    )
}

const PointCloudState = ({ position}) => {
    const worldpointData = useControls(("Test Data"), {
        position: {value:[0,0,0],step:0.5},
        radius: {value:0.3,step:0.1},
        color: {value:"red"},
    })
    return(
    <mesh position={worldpointData.position}>
        <sphereGeometry args={[worldpointData.radius, 32, 32]} />
        <meshBasicMaterial color={worldpointData.color} />
    </mesh>
    )
}

const CameraSetup = () =>{
    const {camera} = useThree();
    useEffect(()=>{
        camera.position.set(0,10,10)
        camera.lookAt(0,0,0)
        camera.updateProjectionMatrix()
    },[camera])
    return null;
}

const playAnimation = (pointRef) => {
    
    gsap.to(pointRef.current.scale, {x: 1.5, y: 1.5, z: 1.5, duration: 1})
    gsap.to(pointRef.current.material.color, {r:0,b:0,g:1, duration: 1})
}


const MapView = () => {
    //leva control 
    const testData = useControls({
        sunPosition: {value: [0.05, 0.5, 0], step: 0.01} ,
    })

    const attractionPointData = [
        {name : "Sunway College Kathmandu" , x : 3, y : 5, z : 1 , image: "mainCollege.jpg" , description : "Sunway College Kathmandu, affiliated with Birmingham College UK, is widely regarded as the premier institution for AI studies in Kathmandu. Known for its cutting-edge curriculum and state-of-the-art facilities, Sunway College attracts aspiring AI professionals from across the region. The college offers a comprehensive education that combines theoretical knowledge with practical applications, ensuring students are well-prepared for the dynamic field of artificial intelligence. With a team of experienced faculty and strong international ties, Sunway College provides an exceptional learning environment that fosters innovation and excellence, making it the top choice for AI education in Kathmandu."},
        {name : "Temple Cafe" , x : 1, y : -1, z : 0 , image: "templecafe.jpg" , description: "Temple Cafe, situated just south of Matidavi Temple in Kathmandu, is a charming spot known for its delightful egg rolls and aromatic tea. This cozy cafe, a favorite among both locals and visitors, offers a perfect blend of delicious food and a serene atmosphere. The egg rolls, renowned for their crispiness and flavorful filling, paired with a cup of the cafe's expertly brewed tea, make for an unforgettable culinary experience. With its proximity to the historic Matidavi Temple, Temple Cafe provides a relaxing retreat where patrons can unwind and enjoy the scenic beauty of the surrounding area."},
        {name : "Stage" , x : 8, y : 2.5, z : 0.5 , image: "stage.jpg", description :"Sunway Stage, located on the south side of Sunway College Kathmandu, is a popular hangout spot for students, offering a vibrant and welcoming atmosphere. This area serves as a social hub where students can relax, socialize, and unwind between classes. Known for its pleasant ambiance, Sunway Stage features comfortable seating and scenic surroundings, making it an ideal place for casual gatherings and study sessions. Whether grabbing a quick bite or simply enjoying the company of friends, students appreciate the laid-back vibe and community spirit that Sunway Stage fosters."},
        {name : "Maitidevi Temple " , x : -4, y : -2, z : 0, image: "temple.jpg" , description :"Matidavi Temple, located in the vibrant city of Kathmandu, Nepal, is a revered religious site dedicated to the goddess Matidavi. Nestled amidst the rich cultural heritage of the Kathmandu Valley, this temple stands as a testament to the profound spiritual traditions of the region. The temple's architecture, adorned with intricate carvings and traditional Nepali designs, attracts both devotees and tourists alike. Surrounded by the picturesque beauty of the Himalayas, Matidavi Temple serves as a serene sanctuary for worship and meditation, offering a glimpse into the timeless devotion and cultural legacy of Nepal."},
    ]

    const attractionPoints = useMemo(() => attractionPointData, []);

    const [currentSelected , setCurrentSelected] = useState(attractionPointData[0])


    //point Cloud
const PointCloud = ({pointData, position}) => {
    const pointRef = useRef();
    const {camera} = useThree();

    const handleClickSph = (event) => {
        setCurrentSelected(pointData)
        
        playAnimation(pointRef)
    }

    return(
    <>
    <mesh onClick={handleClickSph} ref={pointRef} position={position}>
        <Billboard>
        <Text
        color="white"
        fontSize={0.5}
        position={[0, 1, 0]}
        anchorX="center"
        anchorY="middle"
      >
        {pointData.name}
      </Text>
      </Billboard>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color={"blue"} />
    </mesh>
    </>
    )
}

//testPoint

    

  return (
    <div>
        <div style={{
            position: 'absolute',
            top: '7vh',
            marginTop: '7vh',
            zIndex: 99,
          }}>
        <Leva fill/>
        </div>

        
        <div className="mapview grid grid-cols-4 gap-2">
            <div className="col-span-3">
        <Canvas className="mainCanvas">
        <CameraSetup/>
        <OrbitControls/>
        <Sky 
            distance={450000} 
            sunPosition={testData.sunPosition} 
            inclination={0.5} 
            azimuth={0.25} 
        />
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />

        <PointCloudState/>
        
        {attractionPoints.map((data,index)=>{
                return <PointCloud key={index} pointData={data} position={[data.x,data.z,data.y]}/>
            })}

        
        <Grid  position={[0,0,0]} args={[20,20]}/>



            <LoadModel/>

            <Stats />
        </Canvas>
            </div>

            <div className="infoplace rounded-lg bg-red-700 ">
                <div className="card my-6">
                    <p className="title text-center text-white font-bold">
                        {currentSelected.name}
                    </p>
                    <div className=" my-6 flex justify-center">
                    <img className="w-5/6" src={`/imageCard/${currentSelected.image}`} alt={currentSelected.name} />
                    </div>
                    <div>
                        <p className="mx-6 text-sm text-white">
                            {currentSelected.description}
                        </p>
                    </div>

                    <div>
                        <p className="text-center my-7 font-bold text-white">
                            Double Click to select point...
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default MapView