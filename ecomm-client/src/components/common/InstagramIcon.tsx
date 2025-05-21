const InstagramIcon = ({ height = 44 ,width=44}: { height?:number,width?: number }) => (
  <div style={{ width: width, height: height }} className="inline-block group cursor-pointer">
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      className="transition-colors duration-300 text-white group-hover:text-transparent group-hover:fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="igGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="50%" stopColor="#d62976" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </linearGradient>
      </defs>
      <path
        fill="currentColor"
        className="group-hover:fill-[url(#igGradient)]"
        d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 3.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"
      />
    </svg>
  </div>
);

export default InstagramIcon;
