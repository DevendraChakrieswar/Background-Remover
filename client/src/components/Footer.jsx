import { assets, footerConstants } from "../assets/assets"

const Footer = () => {
  return (
    <>
      {/* Wavy SVG Top */}
      <div className="w-full -mb-1 overflow-hidden leading-none">
        <svg
          className="w-full h-12"
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#5e6971"
            d="M0,32 C360,120 1080,-40 1440,60 L1440,100 L0,100 Z"
          />
        </svg>
      </div>
      <footer className="flex items-center justify-between gap-4 px-4 lg:px-44 py-3 bg-[#5e6971] text-white mt-0">
        <img src={assets.logo} alt="logo" width={32}/>
        <p className="flex-1 border-l border-gray-100 max-sm:hidden text-center">
            &copy; {new Date().getFullYear()} DevendraChakrieswar | All rights reserved.
        </p>
        <div className="flex gap-3">
            {footerConstants.map((item, index) => (
                <a href={item.url} key={index} target="_blank" rel="noopener noreferrer">
                    <img src={item.logo} alt="logo" width={32}/>
                </a>
            ))}
        </div>
        <p className="text-center text-gray-700 font-medium"></p>
      </footer>
    </>
  )
}

export default Footer