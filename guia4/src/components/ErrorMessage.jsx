export default function ErrorMessage({children}) {
    return (
        <p className=" bg-red-600 p-2 text-center text-white uppercase text-sm fontbold">{children}</p>
    )
}