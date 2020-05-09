import React from 'react';

 export default function Question(props) {
//     const categories = props.results.map((x, i) =>
//         x[i]
//     )

    return (
        <div>
            {props.results.map((result, i) => <p>{result[i]}</p>)}
        </div>
    )
}
