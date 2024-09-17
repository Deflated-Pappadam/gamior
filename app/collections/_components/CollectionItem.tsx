import { Key, ReactElement, JSXElementConstructor, ReactNode, AwaitedReactNode } from "react";

export default function CollectionItem(props: { id: Key; image: string; name: string }) {
    return (
        <div className="group relative overflow-hidden shadow-md">
            <div className="aspect-w-3 aspect-h-2">
                <img
                    src={props.image}
                    alt={props.name}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
            </div>
            <div className="absolute bottom-0 left-0 h-[70%] w-full bg-gradient-to-t from-[#000000e0] to-20%-transparent p-2 text-white">
                <p className="absolute bottom-5 left-5 text-2xl font-semibold">{props.name}</p>
            </div>
      </div>
    )
}