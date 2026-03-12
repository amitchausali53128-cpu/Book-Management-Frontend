export default function Card({ title, desc, bg}) {
  return (
    <div className="w-fit h-fit rounded-xl shadow-md p-4 m-2 text-white" style={{background:bg}}>
      <h2 className="font-bold text-3xl">{title}</h2>
      <h3 className="text-2xl">{desc}</h3>
    </div>
  );
}
