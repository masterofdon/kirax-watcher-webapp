import React from 'react';
import ImageGallery from 'react-image-gallery';

import "react-image-gallery/styles/css/image-gallery.css";


export default class Example extends React.Component {
    constructor() {
        super(...arguments);
    }

    render() {
        const { attachments } = this.props;
        const attachmentMap = (attachments || []).map((attachment) => {
            return (
                {
                    original: attachment.link,
                    thumbnail: attachment.link,
                }
            )
        });

        return (
            <ImageGallery
                items={attachmentMap}
                showNav={false}
                showPlayButton={false}
            />
        );
    }
}