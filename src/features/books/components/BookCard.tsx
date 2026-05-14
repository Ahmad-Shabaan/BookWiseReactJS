import TiltedCard from "@/components/TiltedCard"

type props = {
    imageUrl: string,
    title: string
}

const BookCard = ({ imageUrl, title }: props) => {
    return (
        <div>
            <TiltedCard
                imageSrc={imageUrl}
                altText="Kendrick Lamar - GNX Album Cover"
                captionText={title}
                containerHeight="300px"
                containerWidth="300px"
                imageHeight="300px"
                imageWidth="300px"
                rotateAmplitude={25}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip
            // displayOverlayContent
            // overlayContent={
            //     <p className="tilted-card-demo-text">
            //         {title}
            //     </p>
            // }
            />
            <p>{title}</p>
        </div>
    )
}

export default BookCard