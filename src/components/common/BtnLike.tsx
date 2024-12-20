import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

interface BtnLikeProps {
    children: React.ReactNode;
    like: string;
    btnStyle: string;
}

const BtnLike: React.FC<BtnLikeProps> = ({ children, like, btnStyle}) => {
    return (
        <NavLink
            to={like}
            className={({ isActive, isPending }) =>
            classNames(btnStyle,
                {'active': (isActive), 'pending': isPending}
            )}>
            { children }
        </NavLink>
    )
}

export default BtnLike;
