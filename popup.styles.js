import styled from './lib/styled.js';

export default styled`
:root {
    --app-spacing: 1rem;
    --app-min-height: 350px;
    --stash-default-gradient: linear-gradient(129deg, rgba(170, 249, 164, 1) 0%, rgba(255, 160, 20, 1) 46%, rgba(185, 101, 255, 1) 100%);
}

body * {
    box-sizing: border-box;
}

body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background: rgb(170, 249, 164);
    background: var(--stash-default-gradient);
    /* overscroll-behavior: none; */

    .hide {
        display: none !important;
    }
}

main {
    display: block;
    width: 300px;
    min-height: var(--app-min-height);
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
                }

                &[data-isSection="yes"] {
                    background-color: transparent !important;
                    font-weight: 500;
                    font-size: 1.2em;
                    &:hover {
                        background-color: transparent;
                        box-shadow: none;
                    }
                    & a {
                        grid-template-columns: 1fr;
                        padding-bottom: 0.5rem;
                        border-bottom: 1px solid #092609;
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
            opacity: .6;
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
        transition: all .1s ease-out;
        padding: 5px;
        position: fixed;
        top: 1rem;
        left: .5rem;
        right: .5rem;
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, .4);
        z-index: 90000;
        border-radius: 15px;
        box-shadow: 0px 3px 0px 5000px rgba(0,0,0,0.31);
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
        }
        & a {
            text-decoration: none;
            color: #3dbafc;
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
            box-shadow: -1px -1px 10px 1px rgba(0,0,0,0.16);
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
                    color: #7c7c7c;
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

footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;  
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, .3);
    border-top: 1px outset #e2e2e2;
    z-index: 1000;
    display: grid;
    grid-template-columns: 15% 1fr 20%;
    align-items: center;
    justify-content: center;
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
                --size: 17px;
                transform: rotate(45deg);
                &:hover {
                    transform: rotate(225deg) !important;
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

`;