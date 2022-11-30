import RinconUsuario from './RinconUsuario';

export default () => {
  return (
    <nav className="z-50 sticky top-0 bg-slate-50 shadow-xl w-full h-16 flex flex-row p-2 items-center">
      <span className="font-MaterialIcons text-[3rem] text-primario">
        face_3
      </span>
      <span className="text-[2rem] font-extrabold pl-2 tracking-widest">
        Lucila
      </span>
      <span className="text-[2rem] font-extralight">App</span>
      <div className="flex-1" />
      <RinconUsuario />
    </nav>
  );
};
