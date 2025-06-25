import styled from './lib/styled.js';

export default styled`
:root {
    --app-spacing: 1rem;
    --app-min-height: 350px;
    --stash-default-gradient: linear-gradient(135deg, rgba(255, 160, 20, 1) 0%, rgba(185, 101, 255, 1) 25%, rgba(170, 249, 164, 1) 50%, rgba(255, 160, 20, 1) 75%, rgba(185, 101, 255, 1) 100%);
    /* --stash-default-gradient: linear-gradient(45deg, rgba(170, 249, 164, 1) 0%, rgba(255, 160, 20, 1) 25%, rgba(185, 101, 255, 1) 50%, rgba(170, 249, 164, 1) 75%, rgba(255, 160, 20, 1) 100%); */
}

@keyframes gradientRotate {
    0% {
        transform: rotate(0deg) scale(1);
    }
    25% {
        transform: rotate(90deg) scale(1.1);
    }
    50% {
        transform: rotate(180deg) scale(1);
    }
    75% {
        transform: rotate(270deg) scale(1.2);
    }
    100% {
        transform: rotate(360deg) scale(1);
    }
}

@keyframes subtleBlur {
    0% {
        filter: blur(0px) saturate(1);
    }
    25% {
        filter: blur(0.5px) saturate(1.3);
    }
    50% {
        filter: blur(1px) saturate(1.1);
    }
    75% {
        filter: blur(0.5px) saturate(1.2);
    }
    100% {
        filter: blur(0px) saturate(1);
    }
}

body * {
    box-sizing: border-box;
}

body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    position: relative;
    overflow-x: hidden; /* Only hide horizontal overflow */
    overflow-y: auto;   /* Allow vertical scrolling for auto-scroll to work */

    /* &::-webkit-scrollbar {
        display: none;
    } */

    &::before {
        content: '';
        position: fixed;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        /* background: linear-gradient(45deg, rgba(170, 249, 164, 1) 0%, rgba(255, 160, 20, 1) 25%, rgba(185, 101, 255, 1) 50%, rgba(170, 249, 164, 1) 75%, rgba(255, 160, 20, 1) 100%); */
        background: var(--stash-default-gradient);
        animation: gradientRotate 40s linear infinite, 
                   subtleBlur 8s ease-in-out infinite;
        z-index: -1;
    }

    &::after {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('./assets/noise-light.png');
        background-repeat: repeat;
        background-size: 150px 150px;
        z-index: 0;
    }

    .hide {
        display: none !important;
    }
}

main {
    display: block;
    width: 300px; /* Adjust to your desired width */
    min-height: var(--app-min-height);
    max-height: 600px; /* Add max height to create scrollable area */
    overflow-y: auto;  /* Allow vertical scrolling */
    z-index: 1;
    position: relative;
    
    /* Hide scrollbars while keeping scroll functionality */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    
    /* Hide scrollbar for webkit browsers (Chrome, Safari, newer Edge) */
    &::-webkit-scrollbar {
        display: none;
    }

    & #bstash-blocker {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9999999;
        background-color: rgba(255,255,255, .3);
    }
    .hide {
        display: none !important;
    }
    .invisible {
        visibility: hidden !important;
    }
    .bstash-list-con {
        padding-bottom: 3rem; 
        & ul {
            list-style: none;
            margin: 0;
            padding: 0;
            & li {
                position: relative;
                display: block;
                margin-top: calc(var(--app-spacing) / 2);
                padding: calc(var(--app-spacing) / 2);
                padding-left: calc(var(--app-spacing) / 1.3);
                background-color: rgba(255, 255, 255, .4);
                transition: all .3s linear;
                /* border-radius: 13px; */
                border-radius: 7px;
                &:hover {
                    background-color: rgba(255, 255, 255, 1);
                    box-shadow: 0px 6px 12px 2px rgba(0, 0, 0, 0.18);
                    & a span {
                        width: 90%;
                    }
                    .bstash-trash-icon {
                        opacity: .5;                       
                    }
                }  
                &.drag-in-place {
                    opacity: 0;
                    cursor: grabbing;
                }
                &[draggable="true"] {
                    cursor: grabbing;
                    & a {
                        cursor: grabbing;
                    }
                }

                &[data-isSection="yes"] {
                    background-color: transparent !important;
                    font-weight: 500;
                    font-size: 1.2em;
                    padding-left: 0;
                    padding-right: 0;
                    &:hover {
                        background-color: transparent;
                        box-shadow: none;
                    }
                    & a {
                        grid-template-columns: 8% 1fr;
                        padding-bottom: 0.5rem;
                        border-bottom: 1px solid rgba(9, 38, 9, 0.3);
                        outline: none;
                        & span {
                            text-shadow: 2px 0px 9px #fffdad94;
                        }
                        & .bstash-title-input {
                            background-color: bisque;
                            border: 0px;
                            color: inherit;
                            font: inherit;
                            padding: 0px;
                            border-radius: 3px;
                            outline: none;
                            display: inline-block;
                            width: 88%;
                            cursor: default;
                        }
                        & .section-toggle-icon {
                            transition: transform .2s ease-out;
                            transform: rotate(180deg);
                            --size: 13px;
                            width: var(--size);
                            height: var(--size);
                            opacity: .5;
                        }
                    }
                }
                
                & a {
                    color: #092609;
                    cursor: default;
                    display: grid;
                    grid-template-columns: 10% 1fr;
                    align-items: center;
                    text-decoration: none;
                    position: relative;
                    & img {
                        width: 20px;
                        height: 20px;
                    }
                    & span {
                        width: 95%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                    &,
                    & * {
                        /* See: https://stackoverflow.com/questions/33309632/prevent-link-dragging-but-still-allow-text-highlighting */
                        user-select: none;
                        -webkit-user-drag: none;
                    }
                }
                .bstash-trash-icon {
                    position: absolute;
                    z-index: 100;
                    /* outline: 1px solid red;
                    background-color: yellow; */
                    top: -2px;
                    right: 0;
                    --size: 40px;
                    width: var(--size);
                    height: var(--size); 
                    opacity: 0;
                }
            }
        }
    }

    .bstash-empty-con {
        display: grid;
        grid-template-columns: 1fr;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: calc(var(--app-min-height) - 50px);
        & div {
            text-align: center;
            font-size: 1.5em;
            opacity: .9;
            & img {
                display: block;
                margin: 0 auto;
                width: 80%;
                margin-top: var(--app-spacing);
            }
        }
    }

    .bstash-setting {
        display: block;
        transition: transform .2s cubic-bezier(0.34, 1.56, 0.64, 1);
        padding: 5px;
        position: fixed;
        top: 1rem;
        left: .5rem;
        right: .5rem;
        /* backdrop-filter: blur(3px); */
        background-color: rgba(255, 255, 255, .4);
        overflow: hidden;
        z-index: 90000;
        border-radius: 15px;
        box-shadow: 0px 3px 0px 5000px rgba(0,0,0,0.31);
        border: 4px solid rgba(255, 255, 255, 0.46);
        &::before {
            content: '';
            position: absolute; 
            top: -20px;
            left: 0;
            right: 0;
            bottom: 0;
            height: 100vh;
        }
        &.hide-settings {
            opacity: 0;
            transform: scale(0);
            /* display: none; */
        }
        & a {
            text-decoration: none;
            color: #a059b7;
        }
        & section, 
        & button {
            position: relative;
            z-index: 5000 !important;
        }
        .bstash-setting-border {
            padding: var(--app-spacing);
            padding-bottom: .1rem;
            border-radius: 11px;
            /* box-shadow: -1px -1px 10px 1px rgba(0,0,0,0.16); */
            & section {  
                position: relative;        
                margin: calc(var(--app-spacing) * 1.5) 0;
                margin-bottom: var(--app-spacing);
                &:first-child, &:last-child {
                    margin-top: 0;
                }
                & header {
                    display: grid;
                    grid-template-columns: 10% 1fr;
                    align-items: center;
                    gap: 0;
                    margin-bottom: .5rem;
                    user-select: none;
                    & img {
                        --size: 20px;
                        width: var(--size);
                        height: var(--size);
                    }
                    & span {
                        text-align: left;
                        font-weight: 500;
                        font-size: .8rem;
                    }
                }
                & input[type="text"] {
                    background-color: #fff;
                    display: block;
                    padding: .5rem;
                    outline: none;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    width: 100%;
                    font-family: 'Courier New', Courier, monospace;
                    &.error {
                        border:1px dashed #de5248;
                        background-color: #fba28f;                      
                    }
                }
                & p {
                    color:rgb(67, 67, 67);
                    margin: .2rem 0;
                    font-size: .7rem;                    
                    user-select: none;
                    line-height: 1rem;
                }
            }
            .bstash-settings-button-con {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0;
                align-items: center;
                justify-content: center;
                width: 70%;
                margin: 0 auto;
                margin-bottom: 1rem;
                & button {
                    display: block;
                    margin: 0 auto;
                    padding: .2rem .5rem;
                    color: #000;
                    width: 100%;
                    background-color: transparent;
                    border: 0;
                    cursor: pointer;
                }
                & #bstash-settings-save-button {               
                    &:hover {
                        text-shadow: 1px 0px 9px rgba(233,228,40,0.6);
                    }
                }
                & #bstash-settings-cancel-button {             
                    opacity: .5;
                }
            }
        }
    }
}

.bstash-footer-liquid-glass-container {
    position: fixed !important;
    bottom: 0;
    left: 0;
    width: 100%; 
    background-color: rgba(255, 255, 255, .5);
    border-top: 2px outset rgba(226, 226, 226, 0.5);
    z-index: 1000;
}

footer {
    height: 40px; 
    display: grid;
    grid-template-columns: 15% 1fr 20%;
    align-items: center;
    justify-content: top;
    padding: 0;
    .bstash-footer-child { 
        text-align: center;
        padding: .3rem;
        padding-bottom: .2rem;
        & img.bstash-footer-control {
            transition: transform .2s ease-out;
            opacity: .5;
            --size: 15px;
            width: var(--size);
            height: var(--size);
            display: inline-block;
            position: relative;
            margin-right: .7rem;
            &:last-child {
                margin-right: 0;
            }
            &:hover {
                transform: rotate(180deg);
            }
            &#bstash-section-button {
                --size: 18px;
                &:hover {
                    transform: rotate(45deg) scale(1.1) !important;
                }
            }
            &#bstash-footer-settings-button {
                
            }
        }
    }
    & #bstash-msg-con {
        font-style: italic;
    }
}

.firefox {
    main {
        width: 350px;
        padding: var(--app-spacing);
        padding-left: 0;
        & .bstash-list-con {
            & li {
                padding: calc(var(--app-spacing) / 1.1);
                /* padding-right: 0; */
                & .bstash-trash-icon {
                    --size: 50px;
                    top: 0;
                }
            }
        }
    }
}

`;