import RinconUsuario from './RinconUsuario';

export default () => {
  return (
    <nav className="sticky top-0 bg-slate-50 shadow-xl w-full h-16 flex flex-row p-2 items-center">
      <img
        crossOrigin="anonymous"
        src="https://pps.whatsapp.net/v/t61.24694-24/294146822_152313794054355_8444010492059363439_n.jpg?ccb=11-4&amp;oh=01_AdTB97rCKN_KbL__4lgzPf499ipERHofRiFU6k5bYgGZ9A&amp;oe=6393B41A"
        className="rounded-full border-2 border-pink-500 h-full w-auto"
      />
      <span className="font-mono text-2xl font-bold px-2">LucilaApp</span>
      <div className="flex-1" />
      <RinconUsuario />
    </nav>
  );
};
