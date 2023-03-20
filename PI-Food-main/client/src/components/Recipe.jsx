import React from "react";

export default function Recipe(recipes) {
    const { image, name, dietTypes } = recipes

    return (
      <div>
        <div>
            <img src={image} alt="Not found"/>
        </div>
        <div>
            <h2>{name}</h2>
        </div>
        <div>
            {dietTypes?.map(e =>{
                return (
                    <h5>{e}</h5>
                )
            })}
        </div>
      </div>
    );

}