import React, { Component } from 'react';

const Tabs = props => {
    const { categories, currentCategory } = props;

    return (
        <>
            <ul className="">
                {categories.map(category => {
                    let btnClassName;

                    category.name === currentCategory
                        ? (btnClassName = '')
                        : (btnClassName = '');

                    return (
                        <li className="" key={category.id}>
                            <button
                                className={`btn ${btnClassName} `}
                            >
                                {category.name}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default Tabs;