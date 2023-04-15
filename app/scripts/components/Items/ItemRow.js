import React from 'react'

const ItemRow = ({item}) => {
    return (
        <div className="item-row">
            <img className="item-picture" src={item.picture} alt={`Picture of ${item.name}`}  />
            <p className="item-name"><b><span>{item.name}</span></b></p>
            <p className="item-about">{item.about}</p>
        </div>
    )
}
export default ItemRow