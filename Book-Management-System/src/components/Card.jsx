

export default function Card({ title, desc, bg, icon}) {
  return (
    
    <div
      className="rounded-lg p-4 w-fit flex items-center justify-center font-lato shadow-lg m-2"
      
    >
      <div>
      <h2 className=" text-xl text-center">{title}</h2>
      <h3 className="text-3xl font-bold  text-center">{desc}</h3>
    </div>
      {icon && <div className="text-5xl text-green-600 ml-4">
                    {icon()}
                </div>}
    </div>
  );
}
