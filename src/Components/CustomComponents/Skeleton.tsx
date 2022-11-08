import React from "react"
import ContentLoader from "react-content-loader";

const Skeleton = () => (
    <ContentLoader
        speed={3}
        width={326}
        height={517}
        viewBox="0 0 326 517"
        backgroundColor="#f0eeea"
        foregroundColor="#ecebeb"
    >
        <rect x="37" y="0" rx="13" ry="13" width="290" height="350" />
        <rect x="37" y="373" rx="13" ry="13" width="290" height="125" />
    </ContentLoader>
)


export default Skeleton