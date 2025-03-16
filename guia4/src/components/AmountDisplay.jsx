export const AmountDisplay = ({ label, amount }) => {
    return (
        <div className="text 2xl text-blue-600 font-bold">
            {label}:
            <span className="font-black text-black"> {amount.toLocaleString("en-US", {style: "currency", currency: "USD"})}</span>
        </div>
    )
}