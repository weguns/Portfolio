import React from "react";
import dayjs from "dayjs";

import {navLinks, navIcons} from "@constants";

const Navbar: React.FunctionComponent = () => {
    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo"/>
                <p className="font-bold">
                    weguns
                </p>
                <ul>
                    {
                        navLinks.map(({id , name}: {id : number, name: string}) => (
                            <li key={id}>
                                <p>{name}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div>
                <ul>
                    {
                        navIcons.map(({id, img}) => (
                            <li key={id}>
                                <img src={img} className="icon-hover" alt={`icon-${id}`}/>
                            </li>
                        ))
                    }
                </ul>

                <time>{dayjs().format('ddd MM D h:mm A')}</time>
            </div>
        </nav>
    )
}
export default Navbar;
