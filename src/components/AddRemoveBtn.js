import './styles/product_in_list.css'



const AddRemoveBtn = ({plus,onClick, disabled})=>{


    return(
        <button className="plus-btn" onClick={onClick} disabled={disabled}>
            <div className="plus-btn-width"></div>
            {plus&&
                <div className="plus-btn-heigth"></div>
            }
        </button>
    )

}
export default AddRemoveBtn