import { Key } from "react";

export default function CollectionItem(props: { id: Key; image: string; name: string }) {
    return (
        <div className="group relative overflow-hidden shadow-md aspect-w-1 aspect-h-1">
            <div className="h-full w-full">
                <img
                    src={props.image}
                    alt={props.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
            </div>
            <div className="absolute bottom-0 left-0 h-[50%] w-full bg-gradient-to-t from-black/80 to-transparent p-2 text-white flex items-end">
                <p className="text-xl font-semibold">{props.name}</p>
            </div>
        </div>
    );
}
