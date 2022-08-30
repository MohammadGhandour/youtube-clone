import React, { useEffect, useRef } from 'react'
import { categories } from '../../utils/constants';
import './SideBar.css';
import useWindowWidth from '../../hooks/useWindowDimensions';

function SideBar({ selectedCategory, setSelectedCategory, sideBarOpen, setSideBarOpen }) {

    const sideBarRef = useRef(null);
    const { width } = useWindowWidth();

    useEffect(() => {
        window.addEventListener('click', (e) => {
            if (!e.target.className.includes('fa-bars'))
                setSideBarOpen(false);
        })
    }, [setSideBarOpen]);

    useEffect(() => {
        if (width < 1024) {
            setSideBarOpen(false);
        }
    }, [width, setSideBarOpen])

    return (
        <div className={sideBarOpen ? 'side-bar open' : 'side-bar'} ref={sideBarRef}>
            {
                categories.map((category, i) => (
                    <div
                        key={i}
                        className={category.name === selectedCategory ? 'category-btn active' : 'category-btn'}
                        onClick={() => setSelectedCategory(category.name)}
                    >
                        <span className='category-icon'>{category.icon}</span>
                        <span className='category-name'>{category.name}</span>
                    </div>
                ))
            }
        </div>
    )
}

export default SideBar;
