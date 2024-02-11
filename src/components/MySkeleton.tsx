import React, {useState} from 'react';

function MySkeleton({children, imageSize, src}) {
    const [loading, setLoading] = useState(true);

    const handleImageLoad = () => {
        setLoading(false);
    };

    return (
        <div


            style={{
                position: 'relative',
                display: 'inline-block',
                marginLeft: "auto",
                marginRight: "auto"
            }}>
            {loading && React.Children.toArray(children)}
            <img

                src={src}
                onLoad={handleImageLoad}
                style={{
                    display: loading ? 'none' : 'block',
                    width: '100%',
                    height: imageSize,
                    marginLeft: "auto",
                }}
            />
        </div>
    );
}

export default MySkeleton;