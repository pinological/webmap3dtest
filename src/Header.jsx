

const Header = () => {
  return (
    <div className="mx-2 grid grid-cols-2">
        <div className="logo">
            <img src="./logo.webp" alt="logo" width={400}/>
        </div>
        <div className="flex justify-end items-center">
            <p className=" text-2xl text-red-700 font-bold">Sunway College Map Test</p>
        </div>
    </div>
  )
}

export default Header