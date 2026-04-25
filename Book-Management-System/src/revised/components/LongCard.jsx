export default function LongCard({title, value, icon}){

    return(
        <div className="md:max-w-60 h-20 rounded-2xl flex items-center shadow-[0_0_20px_0_rgba(0,0,0,0.1)] border-slate-500 shrink-0 bg-white w-full font-lato">
            <div className="flex justify-between items-stretch w-full p-4">
                <div>
                    <h3>
                        {title}
                    </h3>
                    <p className="font-bold text-2xl">
                        {value}
                    </p>
                </div>
                {icon && <div className="text-3xl text-green-600">
                    {icon()}
                </div>}
            </div>
        </div>
    )
}