import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewer = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${window.pdfjs.version}/build/pdf.worker.min.js`}>
                <Viewer fileUrl={pdfUrl} />
            </Worker>
        </div>
    );
};

export default PdfViewer;
