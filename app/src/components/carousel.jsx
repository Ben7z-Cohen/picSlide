import React, { useEffect, useState } from 'react'
export const Carousel = () => {
//Todo: change all numbers to magic numbers
    const createPictureObject = (data) => {
        let newArray = []
        for (const picture in data) {
            newArray.push(data[picture]);
        }
        setPictures(newArray);
        setMainPicture(newArray[0]);
    }

    const [pictures, setPictures] = useState(null)
    const [mainPicture, setMainPicture] = useState(null)


    //Todo: Fix the logic for presentin correctly only 3 pictures. 
    const RemoveAndPushElement = (isFirstElement) => {
        let newArray = []
        let element = null;
        if (isFirstElement) {
            if (pictures[0].author === mainPicture.author) {
                element = pictures[1];
            }
            else {
                element = pictures[0]
            }
            for (const elemt in pictures) {
                if (pictures[elemt].author !== element.author) {
                    newArray.push(pictures[elemt])
                }
            }
        }
        else {
            if (pictures[4].author === mainPicture.author) {
                element = pictures[3]
            }
            else {
                element = pictures[3]
            }
            newArray.push(element);
            for (const elemt in pictures) {
                if (pictures[elemt].author !== element.author) {
                    newArray.push(pictures[elemt])
                }
            }
            setPictures(newArray);
        }
    }

    const renderPictures = () => {
        let counter = 0;
        if (pictures) {
            return (
                <div style={{ margin: "20px", cursor: 'pointer' }}>
                    {pictures.map(
                        (pic) => {
                            if (counter < 3 &&
                                mainPicture && pic &&
                                (pic.author !== mainPicture.author)) {
                                { counter++ }
                                return (
                                    <img
                                        src={pic.dowload_url}
                                        height="100"
                                        width="100"
                                        onClick={() => setMainPicture(pic)}
                                    >
                                    </img>)
                            }
                            return null;
                        }
                    )}
                </div>
            );
        }
    }

    useEffect(() => {
        fetch('http://localhost:4000/api/pictures')
            .then(response => response.json())
            .then(data => {
                createPictureObject(data)
            });
    }, [])

    useEffect(() => {
        if (pictures) {
            renderPictures();
        }
    }, [pictures])

    return (
        <div style={{ borderStyle: 'solid' }} >
            <div style={{ margin: '20px', paddingTop: '10px' }} >
                {mainPicture ? <img style={{ borderStyle: 'solid' }}
                    src={mainPicture.dowload_url}
                    width="500"
                    height="500" /> : null}
                <h1 style={{ borderStyle: 'solid' }}>
                    {mainPicture ? mainPicture.author : ''}
                </h1>
            </div>
            <div style={{
                margin: '20px',
                borderStyle: 'solid', display: 'flex', 
                flexDirection: 'row', justifyContent: 'center', paddingTop: '5px'
            }}>
                <div style={{
                    marginRight: '12px', fontSize: '100px',
                    cursor: 'pointer'
                }}
                    onClick={() => RemoveAndPushElement(false)}
                >
                    {"<"}
                </div>
                {renderPictures()}
                <div style={{
                    marginLeft: '12px', fontSize: '100px',
                    cursor: 'pointer'
                }}
                    onClick={() => RemoveAndPushElement(true)}
                >
                    {">"}
                </div>
            </div>
        </div>
    )
}
