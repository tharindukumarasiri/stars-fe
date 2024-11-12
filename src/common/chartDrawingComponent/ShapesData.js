import React from 'react';
export const Categories = {
    'COMMON': 'Common',
    'BPMN': 'BPMN2.0',
    'ARROWS': 'Arrows',
    'CALLOUTS': 'Callouts',
    'BANNERS': 'Banners',
    'TECH':'Tech',
    'MISC': 'Miscellaneous'
}

export const OtherCategories = {
    'DATA_VISUALIZATION': 'Data Visualization',
    'CHARTS': 'Organizational Charts'
}



export const parentNodes = ['Table', 'LineChart']

export const uploadNodeId = 'UploadedNode';

export default {

    Text: {
        image: <text transform="matrix(1 0 0 1 11.6778 62.5603)" className="st0 st1" style={{ fontSize: 2 + 'em' }}>Text</text>,
        viewBox: "0 0 100 100",
        size: { width: 50, height: 20 },
        keepAspectRatio: false,
        hideShape: true,
        category: [Categories.COMMON]
    },
    Circle: {
        image: <>
            <circle className="st0" cx="33.6" cy="33.6" r="32.9" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 67.3 67.3",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 67.3, height: 67.3 },
    },
    Squre: {
        image: <>
            <rect x="0.8" y="0.8" className="st0" width="58.4" height="58.4" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 59.9 59.9",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 59.9, height: 59.9 },
    },
    Pentagon: {
        image: <>
            <polygon className="st0" points="34.7,0.9 0.9,25.5 13.8,65.3 55.7,65.3 68.6,25.5 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 69.5 66.1",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 69.5, height: 66.1 },
    },
    Hexagon: {
        image: <>
            <polygon className="st0" points="56.7,0.8 19.5,0.8 0.9,33 19.5,65.2 56.7,65.2 75.3,33 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 76.2 66",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 76.2, height: 66 },
    },
    Heptagon: {
        image: <>
            <polygon className="st0" points="34,0.8 7.4,13.6 0.8,42.4 19.2,65.5 48.7,65.5 67.1,42.4 60.5,13.6 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 67.9 66.2",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 67.9, height: 66.2 },
    },
    Octagon: {
        image: <>
            <polygon className="st0" points="46.3,0.8 19.6,0.8 0.8,19.6 0.8,46.3 19.6,65.2 46.3,65.2 65.2,46.3 65.2,19.6 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 65.9 65.9",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 65.9, height: 65.9 },
    },
    Nonagon: {
        image: <>
            <polygon className="st0" points="33.5,0.8 12.1,8.6 0.8,28.2 4.7,50.6 22.1,65.2 44.8,65.2 62.3,50.6 66.2,28.2 54.8,8.6 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 67 66",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 67, height: 66 },
    },
    Decagon: {
        image: <>
            <polygon className="st0" points="45.5,0.8 24.4,0.8 7.3,13.2 0.8,33.3 7.3,53.3 24.4,65.8 45.5,65.8 62.6,53.3 69.2,33.3 62.6,13.2 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 69.9 66.5",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 69.9, height: 66.5 },
    },
    Rounded: {
        image: <>
            <path className="st0" d="M55.5,80.8H26c-13.9,0-25.3-11.3-25.3-25.3V26C0.8,12.1,12.1,0.8,26,0.8h29.5c13.9,0,25.3,11.3,25.3,25.3v29.5
	C80.8,69.5,69.5,80.8,55.5,80.8z" vectorEffect="non-scaling-stroke"/>
        </>
        ,
        viewBox: "0 0 81.5 81.5",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 81.5, height: 81.5 },
    },
    RoundedCut: {
        image: <>
            <path className="st0" d="M42.6,0.8H2.1c8.4,7,13.8,17.6,13.8,29.4S10.5,52.6,2.1,59.6h40.5c10.8,0,19.6-8.8,19.6-19.6V20.3
	C62.2,9.5,53.4,0.8,42.6,0.8z" vectorEffect="non-scaling-stroke"/>
        </>
        ,
        viewBox: "0 0 62.9 60.4",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 62.9, height: 60.4 },
    },
    Funnel: {
        image: <>
            <polygon className="st0" points="68.9,0.8 1.7,0.8 32.3,32.9 1.7,65.1 68.9,65.1 38.4,32.9 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 70.7 65.9",
        keepAspectRatio: false,
        hideTextInput: true,
        category: [Categories.COMMON],
        size: { width: 70.7, height: 65.9 },
    },
    Penant: {
        image: <>
            <polygon className="st0" points="38,47.8 38,0.8 0.8,0.8 0.8,47.8 19.4,66.5 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 38.8 67.6",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 38.8, height: 67.6 },
    },
    PinFat: {
        image: <>
            <path className="st0" d="M31.4,66.5c0,0-30.6-21.5-30.6-34.9V25C0.8,11.6,11.6,0.7,25,0.8l11.9,0c13.4,0,24.3,10.9,24.3,24.3v6.6
	C61.2,45,31.4,66.5,31.4,66.5z" vectorEffect="non-scaling-stroke"/>
        </>
        ,
        viewBox: "0 0 62 67.4",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 62, height: 67.4 },
    },
    Rectangle: {
        image: <>
            <polygon className="st0" points="1.4,64.9 41.3,1.4 81.2,64.9 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 82.5 65.7",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 82.5, height: 65.7 },
    },
    RoundedRectangle: {
        image: <>
            <path className="st0" d="M58.8,55.8H13.3c-6.9,0-12.6-5.6-12.6-12.6V13.3c0-6.9,5.6-12.6,12.6-12.6h45.5c6.9,0,12.6,5.6,12.6,12.6v29.9
	C71.3,50.1,65.7,55.8,58.8,55.8z" vectorEffect="non-scaling-stroke"/>
        </>
        ,
        viewBox: "0 0 72.1 56.5",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 72.1, height: 56.5 },
    },
    RoundedSqure: {
        image: <>
            <path className="st0" d="M41.6,58.7H17.9C8.4,58.7,0.8,51,0.8,41.6V17.9c0-9.5,7.7-17.1,17.1-17.1h23.7c9.5,0,17.1,7.7,17.1,17.1v23.7
	C58.7,51,51,58.7,41.6,58.7z" vectorEffect="non-scaling-stroke"/>
        </>
        ,
        viewBox: "0 0 59.4 59.4",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 59.4, height: 59.4 },
    },
    ShapeDiamond: {
        image: <>
            <polygon className="st0" points="39.6,0.9 1.3,26.7 39.6,52.5 77.8,26.7 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 79.2 53.4",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 79.2, height: 53.4 },
    },
    Squre2Angled: {
        image: <>
            <polygon className="st0" points="45.4,0.8 40.9,0.8 1.5,0.8 33.2,40.9 40.9,40.9 45.4,40.9 53.1,40.9 84.7,0.8 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 86.3 41.7",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 86.3, height: 41.7 },
    },
    SqureAngled: {
        image: <>
            <rect x="10.7" y="10.7" transform="matrix(0.7071 0.7071 -0.7071 0.7071 33.9926 -14.0802)" className="st0" width="46.6" height="46.6" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 68 68",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 68, height: 68 },
    },
    SqureCornersCut: {
        image: <>
            <path className="st0" d="M63.1,14.7c-7.3,0-13.3-6-13.3-13.3c0-0.2,0-0.4,0-0.6H14.6c0,0.2,0,0.4,0,0.6c0,7.3-6,13.3-13.3,13.3
	c-0.2,0-0.4,0-0.5,0v35.3c0.2,0,0.4,0,0.5,0c7.3,0,13.3,6,13.3,13.3c0,0,0,0.1,0,0.1h35.2c0,0,0-0.1,0-0.1c0-7.3,6-13.3,13.3-13.3
	c0.1,0,0.1,0,0.2,0V14.7C63.2,14.7,63.1,14.7,63.1,14.7z" vectorEffect="non-scaling-stroke"/>
        </>
        ,
        viewBox: "0 0 64 64",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 64, height: 64 },
    },
    SqureSlantCut: {
        image: <>
            <polygon className="st0" points="67.8,61.4 49.4,61.4 1.5,0.8 67.8,0.8 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 68.5 62.2",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 68.5, height: 62.2 },
    },
    SqureSlantCut2: {
        image: <>
            <polygon className="st0" points="0.8,34.2 0.8,60.6 59.2,60.6 59.2,1.3 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 60 61.3",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 60, height: 61.3 },
    },
    Star: {
        image: <>
            <polygon className="st0" points="33.4,1.7 43.2,21.6 65.1,24.8 49.3,40.3 53,62.1 33.4,51.8 13.7,62.1 17.5,40.3 1.6,24.8 23.6,21.6 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 66.7 63.5",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 66.7, height: 63.5 },
    },
    TallRectangle: {
        image: <>
            <rect x="0.8" y="0.8" className="st0" width="26.8" height="65.5" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 28.3 67",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 28.3, height: 67 },
    },
    TriangleAngled: {
        image: <>
            <rect x="0.8" y="0.8" className="st0" width="26.8" height="65.5" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 67.9 67.9",
        keepAspectRatio: false,
        category: [Categories.COMMON],
        size: { width: 67.9, height: 67.9 },
    },
    HorizontalLine: {
        image: <rect x="0.5" width="134" height="2" rx="2" strokeWidth="0" fill='black' vectorEffect="non-scaling-stroke" vectorEffect="non-scaling-stroke"  />,
        viewBox: "0 0 135 2",
        keepAspectRatio: false,
        size: { width: 50, height: 2 },
        hideTextInput: true,
        hideShape: true,
        category: [Categories.COMMON],
    },
    VerticalLine: {
        image: <rect y="0.5" width="2" height="134" rx="2" strokeWidth="0" fill='black' vectorEffect="non-scaling-stroke" vectorEffect="non-scaling-stroke" />,
        viewBox: "0 0 2 135",
        keepAspectRatio: false,
        size: { width: 2, height: 50 },
        hideTextInput: true,
        hideShape: true,
        category: [Categories.COMMON]
    },
    CircleDashed: {
        image: <>
            <circle className="dashed1" cx="31.4" cy="31.4" r="29.9" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 62.9 62.9",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 62.9, height: 62.9 },
    },
    CircleDashedThick: {
        image: <>
            <circle className="dashed-thick" cx="31.4" cy="31.4" r="29.9" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 62.9 62.9",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 62.9, height: 62.9 },
    },
    CircleDualBorder: {
        image: <>
            <circle className="st0" cx="3045.9" cy="2470.4" r="29.9" vectorEffect="non-scaling-stroke" />
            <circle className="st0" cx="30.4" cy="30.4" r="29.9" />
            <circle className="st1" cx="30.4" cy="30.4" r="26.7" />
        </>
        ,
        viewBox: "0 0 60.9 60.9",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 60.9, height: 60.9 },
    },
    CircleThickBorder: {
        image: <>
            <circle className="st0 thick-shape" cx="32.4" cy="32.4" r="29.9" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 64.9 64.9",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 64.9, height: 64.9 },
    },
    CircleThinBorder: {
        image: <>
            <circle className="st0" cx="3097.6" cy="2473.7" r="29.9" vectorEffect="non-scaling-stroke" />
            <circle className="st0" cx="30.4" cy="30.4" r="29.9" />
        </>
        ,
        viewBox: "0 0 60.9 60.9",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 60.9, height: 60.9 },
    },
    CylinderShort: {
        image: <>
            <circle className="st0" cx="3087.7" cy="2465.5" r="29.9" vectorEffect="non-scaling-stroke" />
            <g>
                <path className="st1" d="M70.1,33.3C70.1,33.3,70.1,33.3,70.1,33.3l0-20.4c0-1.7-1.4-3.1-3.1-3.1H3.9c-1.7,0-3.1,1.4-3.1,3.1v20.4
		c0,0.5,0.1,0.9,0.3,1.3c1.9,5.6,16.6,9.9,34.4,9.9C54.6,44.4,70.1,39.5,70.1,33.3C70.1,33.3,70.1,33.3,70.1,33.3z" vectorEffect="non-scaling-stroke"/>
                <ellipse className="st1" cx="35.4" cy="11.7" rx="34.6" ry="11" vectorEffect="non-scaling-stroke" />
            </g>
        </>
        ,
        viewBox: "0 0 70.8 45.2",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 70.8, height: 45.2 },
    },
    CylinderTall: {
        image: <>
            <circle className="st0" cx="3009.5" cy="2474.5" r="29.9" vectorEffect="non-scaling-stroke" />
            <g>
                <path className="st1" d="M63.2,47.5C63.2,47.4,63.2,47.4,63.2,47.5l0-35.8c0-1.5-1.3-2.8-2.8-2.8H3.6c-1.5,0-2.8,1.3-2.8,2.8v35.8
		c0,0.4,0.1,0.8,0.3,1.2c1.7,5,14.9,8.9,31,8.9C49.2,57.5,63.2,53,63.2,47.5C63.2,47.5,63.2,47.5,63.2,47.5z" vectorEffect="non-scaling-stroke"/>
                <ellipse className="st1" cx="32" cy="10.6" rx="31.2" ry="9.9" vectorEffect="non-scaling-stroke" />
            </g>
        </>
        ,
        viewBox: "0 0 63.9 58.3",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 63.9, height: 58.3 },
    },
    Hex: {
        image: <>
            <circle className="st0" cx="3122.4" cy="2470.2" r="29.9" vectorEffect="non-scaling-stroke" />
            <polygon className="st0" points="50,0.5 17,0.5 0.5,29.1 17,57.7 50,57.7 66.6,29.1 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 67.1 58.2",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 67.1, height: 58.2 },
    },
    HexDashed: {
        image: <>
            <polygon className="dashed1" points="50.4,0.8 17.4,0.8 0.9,29.4 17.4,58 50.4,58 66.9,29.4 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 67.8 58.7",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 67.8, height: 58.7 },
    },
    HexThick: {
        image: <>
            <circle className="st0" cx="3058.7" cy="2470.8" r="29.9" vectorEffect="non-scaling-stroke" />
            <polygon className="st1 thick-shape" points="49.2,2.5 18.1,2.5 2.5,29.4 18.1,56.4 49.2,56.4 64.7,29.4 " vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 67.2 58.9",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 67.2, height: 58.9 },
    },
    Para: {
        image: <>
            <circle className="st0" cx="3083.4" cy="2472.3" r="29.9" />
            <g>
                <g>
                    <path className="st1" d="M0,54.4V0h12.5v3.8H4.6v46.9h7.8v3.8H0z" />
                </g>
                <g>
                    <rect x="15.6" y="17.3" className="st1" width="32.1" height="3" />
                    <rect x="15.6" y="33.1" className="st1" width="25.6" height="3" />
                    <rect x="15.6" y="24.9" className="st1" width="41.7" height="3" />
                </g>
            </g>
        </>
        ,
        viewBox: "0 0 57.3 54.4",
        keepAspectRatio: true,
        hideTextInput: true,
        category: [Categories.BPMN],
        size: { width: 57.3, height: 54.4 },
    },
    Rectangle: {
        image: <>
            <circle className="st0" cx="3083.4" cy="2472.3" r="29.9" vectorEffect="non-scaling-stroke" />
            <rect x="0.8" y="0.8" className="st0" width="72" height="47.8" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 73.5 49.3",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 73.5, height: 49.3 },
    },
    RectangleDoubleLine: {
        image: <>
            <rect x="0.8" y="0.8" className="st0" width="72" height="47.8" vectorEffect="non-scaling-stroke" />
            <rect x="4.2" y="4.1" className="st1" width="65.5" height="41" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 73.5 49.3",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 73.5, height: 49.3 },
    },
    RectangleDoubleLine: {
        image: <>
            <rect x="2" y="2" className="st0 thick-shape" width="72" height="47.8" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 76 51.8",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 76, height: 51.8 },
    },
    RectangleThickBorder: {
        image: <>
            <rect x="2" y="2" className="st0 thick-shape" width="72" height="47.8" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 76 51.8",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 76, height: 51.8 },
    },
    SqureAngledThick: {
        image: <>
            <circle className="thick-border" cx="3057.7" cy="2474.2" r="29.9" vectorEffect="non-scaling-stroke" />
            <rect x="11" y="11" transform="matrix(0.7071 0.7071 -0.7071 0.7071 32.842 -13.6036)" className="st1 thick-shape" width="43.6" height="43.6" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 65.7 65.7",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 65.7, height: 65.7 },
    },
    SqureAngledThin: {
        image: <>
            <circle className="st0" cx="3100.1" cy="2476.2" r="29.9" vectorEffect="non-scaling-stroke" />
            <rect x="10.3" y="10.3" transform="matrix(0.7071 0.7071 -0.7071 0.7071 32.8765 -13.6179)" className="st1" width="45.1" height="45.1" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 65.8 65.8",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 65.8, height: 65.8 },
    },
    Table2: {
        image: <>
            <circle className="st0" cx="3064.9" cy="2469.7" r="29.9" vectorEffect="non-scaling-stroke" />
            <rect x="0.8" y="0.8" className="st1" width="28.2" height="45.1" vectorEffect="non-scaling-stroke" />
            <line className="st2" x1="0.8" y1="11.9" x2="28.8" y2="11.5" vectorEffect="non-scaling-stroke" />
            <line className="st2" x1="14.9" y1="12.1" x2="14.9" y2="45.9" vectorEffect="non-scaling-stroke" />
        </>
        ,
        viewBox: "0 0 29.7 46.6",
        keepAspectRatio: false,
        category: [Categories.BPMN],
        size: { width: 29.7, height: 46.6 },
    },
    Table: {
        image: <>
            <circle className="st0" cx="3004" cy="2466.1" r="29.9" vectorEffect="non-scaling-stroke" />
            <rect x="0.8" y="0.8" className="st1" width="69" height="43.3" vectorEffect="non-scaling-stroke" />
            <line className="st2" x1="0.7" y1="11.4" x2="69.7" y2="11" vectorEffect="non-scaling-stroke" />
        </>,
        viewBox: "0 0 70.5 44.8",
        size: { width: 100, height: 100 },
        keepAspectRatio: false,
        hideTextInput: true,
        hideShape: true,
        category: [Categories.BPMN]
    },
    LocationPin: {
        image: <>
            <g vectorEffect="non-scaling-stroke">
                <path className="st0" d="M38.7,7.3C34.5,3.1,28.9,0.8,23,0.8c-5.9,0-11.5,2.3-15.7,6.5C-0.5,15-1.5,29.7,5.2,38.5L23,64.3l17.8-25.7
		C47.5,29.7,46.5,15,38.7,7.3z"/>
                <path className="st1" d="M23.2,14.7c-4.5,0-8.1,3.6-8.1,8.1s3.6,8.1,8.1,8.1s8.1-3.6,8.1-8.1S27.7,14.7,23.2,14.7z" />
            </g>
        </>
        ,
        viewBox: "0 0 46 65.6",
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 46, height: 65.6 },
    },
    LineChart: {
        image: <>
            <polyline className="st0" points="10.2,14.7 88.4,14.7 88.4,87.1 " />
            <path className="st1" d="M87.9,52.8C67,52.8,50,35.9,50,15" />
            <g>
                <g>
                    <path className="st2" d="M87.7,80.7c-0.2,0-0.3,0-0.5,0" />
                    <path className="st3" d="M85.2,80.7c-34.6-1.3-62.3-29.4-63.1-64" />
                    <path className="st2" d="M22.1,15.6c0-0.2,0-0.3,0-0.5" />
                </g>
            </g>
            <line className="st4" x1="88.4" y1="14.7" x2="17.8" y2="57.5" />
            <line className="st4" x1="88" y1="15.2" x2="42.1" y2="83.8" />
        </>
        ,
        viewBox: "0 0 100 100",
        size: { width: 100, height: 100 },
        category: [OtherCategories.CHARTS]
    },
    MatrixChart: {
        image: <>
            <rect x="2" y="2" className="st0" width="78.7" height="66.2" />
            <rect x="10" y="9.3" className="st1" width="62.3" height="52" />
            <line className="st2" x1="40.3" y1="9.8" x2="40.3" y2="61.4" />
            <line className="st2" x1="72.2" y1="35.3" x2="11" y2="35.3" />
        </>
        ,
        viewBox: "0 0 82.7 70.2",
        size: { width: 400, height: 400 },
        keepAspectRatio: false,
        category: [OtherCategories.CHARTS]
    },
    PieChart: {
        image: <>
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#231F20" d="m216.3,45.4c-106,15.4-184.4,105.4-184.4,213.8-7.10543e-15,119.2 97,216.2 216.2,216.2 52,0 101.7-18.6 141-52.5l-163.5-163.5c-6-6-9.3-14-9.3-22.5v-191.5l0-0zm31.7,450.8c-130.7,0-237-106.3-237-237 0-123 92.3-224.5 214.7-235.9 2.9-0.3 5.8,0.7 8,2.7 2.2,2 3.4,4.8 3.4,7.7v203.3c0,2.9 1.1,5.7 3.2,7.7l171.2,171.2c2,2 3.1,4.7 3.1,7.5 0,2.8-1.2,5.5-3.2,7.4-44.4,42.2-102.4,65.4-163.4,65.4z"></path> <g fill="#231F20"> <path d="m286.3,15.8c-3-0.3-10.4,0.9-11.4,10.4v194.4c0,2.8 1.1,5.4 3.1,7.4l162.8,162.8c7.4,6.4 14.1,1.2 15.8-1.3 29-40.5 44.4-88.2 44.4-137.8-5.68434e-14-123-92.3-224.4-214.7-235.9zm160.3,351.4l-150.9-150.9v-178.3c105.9,15.5 184.4,105.4 184.4,213.8 0,41.1-11.5,80.7-33.5,115.4z"></path> <path d="m240.3,244.7c-2.1-2.1-3.2-4.8-3.2-7.7v-203.4c-0.8-9.3-8.5-10.7-11.4-10.4-122.4,11.5-214.7,112.9-214.7,236 0,130.7 106.3,237 237,237 60.9,0 118.9-23.3 163.3-65.5 2-1.9 6-8.1 0.2-14.9l-171.2-171.1zm7.7,230.7c-119.2,0-216.2-97-216.2-216.2 0-108.4 78.5-198.3 184.4-213.8v191.5c0,8.5 3.3,16.5 9.3,22.5l163.5,163.4c-39.3,34-89,52.6-141,52.6z"></path> </g> </g> </g>
        </>,
        viewBox: "0 0 512 512",
        hideTextInput: true,
        category: [OtherCategories.DATA_VISUALIZATION]
    },
    BarChart: {
        image: <>
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g fill="#231F20"> <path d="M21.4,432.5h76.1c5.8,0,10.4-4.7,10.4-10.4V116c0-5.8-4.7-10.4-10.4-10.4H21.4c-5.8,0-10.4,4.7-10.4,10.4 v306.1C11,427.9,15.7,432.5,21.4,432.5z M31.9,126.4h55.2v285.2H31.9V126.4z"></path> <path d="m152.5,432.5h76.1c5.8,0 10.4-4.7 10.4-10.4v-212.8c0-5.8-4.7-10.4-10.4-10.4h-76.1c-5.8,0-10.4,4.7-10.4,10.4v212.8c-0.1,5.8 4.6,10.4 10.4,10.4zm10.4-212.7h55.2v191.9h-55.2v-191.9z"></path> <path d="m283.5,432.5h76.1c5.8,0 10.4-4.7 10.4-10.4v-375.8c0-5.8-4.7-10.4-10.4-10.4h-76.1c-5.8,0-10.4,4.7-10.4,10.4v375.8c0,5.8 4.6,10.4 10.4,10.4zm10.4-375.8h55.2v355h-55.2v-355z"></path> <path d="m490.6,152.7h-76.1c-5.8,0-10.4,4.7-10.4,10.4v259c0,5.8 4.7,10.4 10.4,10.4h76.1c5.8,0 10.4-4.7 10.4-10.4v-259c0-5.7-4.7-10.4-10.4-10.4zm-10.5,259h-55.2v-238.1h55.2v238.1z"></path> <path d="m490.6,455.3h-469.2c-5.8,0-10.4,4.7-10.4,10.4s4.7,10.4 10.4,10.4h469.1c5.8,0 10.4-4.7 10.4-10.4s-4.6-10.4-10.3-10.4z"></path> </g> </g> </g>
        </>,
        viewBox: "0 0 512 512",
        hideTextInput: true,
        category: [OtherCategories.DATA_VISUALIZATION],
        size: { width: 440, height: 280 },
    },
    MatrixTable: {
        image: <>
            <rect x="2" y="2" className="st0 thick-border3" width="78.7" height="66.2" />
            <rect x="10" y="9.3" className="st1 thick-border3" width="62.3" height="52" />
            <line className="st2 thick-border3" x1="40.3" y1="9.8" x2="40.3" y2="61.4" />
            <line className="st2 thick-border3" x1="72.2" y1="35.3" x2="11" y2="35.3" />
        </>,
        viewBox: "0 0 82.7 70.2",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [OtherCategories.CHARTS],
        size: { width: 400, height: 400 },
    },
    ThickArrow: {
        image: <>
            <polygon className="st0" points="56.1,19.9 38,1.8 38,8.8 0.8,8.8 0.8,31 38,31 38,38 " />
        </>,
        viewBox: "0 0 57.1 39.8",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.ARROWS],
        size: { width: 57.1, height: 39.8 },
    },
    ThickArrow2way: {
        image: <>
            <polygon className="st0" points="34.1,31.9 34.1,31.9 45.8,31.9 45.8,39.1 64.5,20.5 45.8,1.8 45.8,9 22.4,9 22.4,9 19.7,9 19.7,1.8 
	1.1,20.5 19.7,39.1 19.7,31.9 "/>
        </>,
        viewBox: "0 0 65.5 41",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.ARROWS],
        size: { width: 65.5, height: 41 },
    },
    ThickArrow3way: {
        image: <>
            <polygon className="st0" points="58.9,33.1 46.5,20.7 46.5,25.5 37.5,25.5 37.5,13.4 42.3,13.4 30,1.1 17.6,13.4 22.4,13.4 22.4,25.5 
	21.1,25.5 21.1,25.5 13.4,25.5 13.4,20.7 1.1,33.1 13.4,45.4 13.4,40.6 38.8,40.6 38.8,40.6 46.5,40.6 46.5,45.4 "/>
        </>,
        viewBox: "0 0 59.9 47.2",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.ARROWS],
        size: { width: 59.9, height: 47.2 },
    },
    ThickArrow4way: {
        image: <>
            <polygon className="st0" points="62.7,31.9 49.6,18.7 49.6,23.8 40,23.8 40,22.5 40,22.5 40,14.2 45.1,14.2 31.9,1.1 18.7,14.2 
	23.8,14.2 23.8,23.8 22.5,23.8 22.5,23.8 14.2,23.8 14.2,18.7 1.1,31.9 14.2,45.1 14.2,40 23.8,40 23.8,41.3 23.8,41.3 23.8,49.6 
	18.7,49.6 31.9,62.7 45.1,49.6 40,49.6 40,40 41.3,40 41.3,40 49.6,40 49.6,45.1 "/>
        </>,
        viewBox: "0 0 63.8 63.8",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.ARROWS],
        size: { width: 63.8, height: 63.8 },
    },
    ThickArrowFat: {
        image: <>
            <polygon className="st0" points="33.5,0.8 1.9,0.8 36.2,32.4 1.9,64 33.5,64 67.8,32.4 " />
        </>,
        viewBox: "0 0 68.9 64.8",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.ARROWS],
        size: { width: 68.9, height: 64.8 },
    },
    ThickArrowFullCurved: {
        image: <>
            <path className="st0" d="M57.4,41.7l9.6-9.6h-3.5c0-17.3-14.1-31.4-31.4-31.4C14.8,0.8,0.8,14.8,0.8,32.1c0,17.3,14.1,31.4,31.4,31.4
	c9.7,0,18.8-4.4,24.8-12.1l-9.3-7.2c-3.8,4.8-9.4,7.6-15.5,7.6c-10.8,0-19.6-8.8-19.6-19.6s8.8-19.6,19.6-19.6
	c10.8,0,19.6,8.8,19.6,19.6h-3.9L57.4,41.7z"/>
        </>,
        viewBox: "0 0 68.8 64.3",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.ARROWS],
        size: { width: 68.8, height: 64.3 },
    },
    ThickArrowHalfCurved: {
        image: <>
            <path className="st0" d="M70.9,35.7C70.8,16.4,55.1,0.8,35.8,0.8C16.5,0.8,0.8,16.5,0.8,35.8h15.3c0-10.9,8.9-19.8,19.8-19.8
	c10.8,0,19.7,8.8,19.8,19.6h-4.8l12.5,12.5l12.5-12.5H70.9z"/>
        </>,
        viewBox: "0 0 77.6 49.2",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.ARROWS],
        size: { width: 77.6, height: 49.2 },
    },
    ThickArrowLongTurn: {
        image: <>
            <path className="st0" d="M56.4,13.9L44.3,1.8v4.7l-23.9,0c-0.3,0-0.6,0-1,0h0v0C9,7,0.8,15.6,0.8,26.1v39.1h14.9V26.1
	c0-2.6,2.1-4.7,4.7-4.7l23.9,0V26L56.4,13.9z"/>
        </>,
        viewBox: "0 0 57.5 66",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.ARROWS],
        size: { width: 57.5, height: 66 },
    },
    ThickArrowPenantTail: {
        image: <>
            <polygon className="st0" points="57.3,21.1 38,1.8 38,9.3 1.8,9.3 13.6,21.1 1.8,32.9 38,32.9 38,40.4 " />
        </>,
        viewBox: "0 0 58.3 42.2",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.ARROWS],
        size: { width: 58.3, height: 42.2 },
    },
    ThickArrowPoint: {
        image: <>
            <polygon className="st0" points="27,0.8 0.8,0.8 0.8,53.3 27,53.3 55.5,27 " />
        </>,
        viewBox: "0 0 56.6 54.1",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.ARROWS],
        size: { width: 56.6, height: 54.1 },
    },
    ThickArrowTail: {
        image: <>
            <g>
                <polygon className="st0" points="70.9,16.3 56.4,1.8 56.4,7.4 26.6,7.4 26.6,25.1 56.4,25.1 56.4,30.7 	" />
                <rect x="16.6" y="7.5" className="st0" width="6.7" height="17.6" />
                <rect x="8.1" y="7.5" className="st0" width="4.8" height="17.6" />
                <rect x="0.8" y="7.5" className="st0" width="3.3" height="17.6" />
            </g>
        </>,
        viewBox: "0 0 71.9 32.6",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.ARROWS],
        size: { width: 71.9, height: 32.6 },
    },
    ThickArrowTall: {
        image: <>
            <polygon className="st0" points="15.2,0.8 1.2,0.8 16.4,32.3 1.2,63.8 15.2,63.8 30.3,32.3 " />
        </>,
        viewBox: "0 0 31.2 64.5",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.ARROWS],
        size: { width: 31.2, height: 64.5 },
    },
    ThickArrowTurn: {
        image: <>
            <path className="st0" d="M67.9,50.9V15.3c0-8-6.5-14.5-14.5-14.5H15.3c-8,0-14.5,6.5-14.5,14.5v13.9h14.2V15.3c0-0.2,0.2-0.3,0.3-0.3
	h38.1c0.2,0,0.3,0.2,0.3,0.3v35.7h-4.5l11.6,11.6l11.6-11.6H67.9z"/>
        </>,
        viewBox: "0 0 74.1 63.5",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.ARROWS],
        size: { width: 74.1, height: 63.5 },
    },
    Callout1: {
        image: <>
            <path className="st0" d="M3.8,0.8h68.7c1.7,0,3,1.4,3,3v60.1c0,1.7-1.4,3-2.2,3l-29.8,0l-5.4,5l-5.4-5l-29,0c-1.7,0-3-1.4-3-3V3.8
	C0.8,2.1,2.1,0.8,3.8,0.8z"/>
        </>,
        viewBox: "0 0 76.3 72.9",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.CALLOUTS],
        size: { width: 76.3, height: 72.9 },
    },
    Callout2: {
        image: <>
            <path className="st0" d="M78.6,0.8H7.9C4,0.8,0.8,4,0.8,7.9v42.7c0,3.9,3.2,7.2,7.2,7.2h6.9l8.7,8.7l8.7-8.7h46.4c3.9,0,7.2-3.2,7.2-7.2
	V7.9C85.8,4,82.5,0.8,78.6,0.8z"/>
        </>,
        viewBox: "0 0 86.5 67.5",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.CALLOUTS],
        size: { width: 86.5, height: 67.5 },
    },
    Callout3: {
        image: <>
            <path className="st0" d="M50.3,0.8H21.8c-11.6,0-21,9.5-21,21v17.5c0,8.5,5.1,15.8,12.3,19.1v9.7l7.8-7.8c0.3,0,0.6,0,0.9,0h28.5
	c11.6,0,21-9.5,21-21V21.8C71.3,10.2,61.9,0.8,50.3,0.8z"/>
        </>,
        viewBox: "0 0 72.1 69.9",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.CALLOUTS],
        size: { width: 72.1, height: 69.9 },
    },
    Callout4: {
        image: <>
            <path className="st0" d="M60.3,69.7H19.2C12.5,69.7,7,64.2,7,57.5V12.9C7,6.2-3.8,0.8,2.9,0.8h57.3c6.7,0,12.2,5.5,12.2,12.2v44.5
	C72.5,64.2,67,69.7,60.3,69.7z"/>
        </>,
        viewBox: "0 0 73.2 70.4",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.CALLOUTS],
        size: { width: 73.2, height: 70.4 },
    },
    Callout5: {
        image: <>
            <path className="st0" d="M68,0.8H8.4c-4.2,0-7.7,3.4-7.7,7.7v39.4c0,4.2,3.4,7.7,7.7,7.7H32v6h-3.9l10.1,10.1l10.1-10.1h-3.9v-6H68
	c4.2,0,7.7-3.4,7.7-7.7V8.4C75.7,4.2,72.2,0.8,68,0.8z"/>
        </>,
        viewBox: "0 0 76.4 72.7",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.CALLOUTS],
        size: { width: 76.4, height: 72.7 },
    },
    Callout6: {
        image: <>
            <polygon className="st0" points="24.1,9 25.5,22.7 13.5,19.3 17.2,26.6 2.7,27.1 18,35.7 8.5,43.5 21.6,44.6 13.5,56.8 33,50.2 
	32.5,59.1 41.2,53.3 46.9,61.3 52,52.4 57.5,66.5 60.6,51.9 70.8,60.3 69.5,49.7 89,52.4 73.9,41.6 87.8,39.6 76.7,34.5 92.3,27.7 
	76.2,25.7 84.8,13.2 70.3,18.8 69.5,9.6 60.3,16.5 60.3,4.3 48.9,14.9 39.1,2.1 38.3,15.4 "/>
        </>,
        viewBox: "0 0 95.1 69",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.CALLOUTS],
        size: { width: 95.1, height: 69 },
    },
    Callout7: {
        image: <>
            <polygon className="st0" points="32.6,2.7 37.5,19.3 51.2,8.7 45.4,25 62.7,24.5 48.5,34.3 62.7,44.1 45.4,43.6 51.2,59.9 37.5,49.4 
	32.6,66 27.7,49.4 14,59.9 19.8,43.6 2.5,44.1 16.8,34.3 2.5,24.5 19.8,25 14,8.7 27.7,19.3 "/>
        </>,
        viewBox: "0 0 65.3 68.6",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.CALLOUTS],
        size: { width: 65.3, height: 68.6 },
    },
    Callout8: {
        image: <>
            <polygon className="st0" points="38.1,1.6 51,25.2 74.6,38.1 51,51 38.1,74.6 25.2,51 1.6,38.1 25.2,25.2 " />
        </>,
        viewBox: "0 0 76.1 76.1",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.CALLOUTS],
        size: { width: 76.1, height: 76.1 },
    },
    Callout9: {
        image: <>
            <path className="st0" d="M43.5,0.8c-23.6,0-42.8,11.2-42.8,25c0,8.8,7.8,16.5,19.5,20.9L7.7,64L30,49.4c4.3,0.8,8.8,1.3,13.5,1.3
	c23.6,0,42.8-11.2,42.8-25C86.3,11.9,67.1,0.8,43.5,0.8z"/>
        </>,
        viewBox: "0 0 87 66.9",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.CALLOUTS],
        size: { width: 87, height: 66.9 },
    },
    Callout10: {
        image: <>
            <g>
                <path className="st0" d="M65,8.3c-2.2,0-4.3,0.2-6.3,0.6C55.2,4.1,48.2,0.8,40,0.8c-10.2,0-18.6,5.2-20.6,12.1c-1.7-1.3-3.9-2-6.2-2
		c-5.5,0-10,4.2-10,9.4c0,4.5,3.4,8.3,8,9.2C11,30.1,11,30.9,11,31.7c0,10.2,9.9,18.4,22.1,18.4c8.3,0,15.5-3.8,19.3-9.5
		c3.6,1.7,8,2.8,12.6,2.8c12.9,0,23.4-7.8,23.4-17.5C88.4,16.2,77.9,8.3,65,8.3z"/>
                <ellipse className="st0" cx="18.8" cy="55.6" rx="7.1" ry="5.5" />
                <ellipse className="st0" cx="5" cy="60.6" rx="4.2" ry="3.3" />
            </g>
        </>,
        viewBox: "0 0 89.2 64.6",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.CALLOUTS],
        size: { width: 89.2, height: 64.6 },
    },
    Callout11: {
        image: <>
            <path className="st0" d="M36.4,2.2l0.4,3.1C37,7,39.4,7.3,40,5.7l1.1-3c0.7-1.8,3.4-1.1,3.2,0.8l-0.4,3.1c-0.2,1.7,2,2.6,3,1.1l1.8-2.6
	c1.1-1.6,3.6-0.3,2.9,1.5l-1.1,2.8c-0.6,1.6,1.3,3,2.6,1.8l2.3-2c1.5-1.3,3.6,0.6,2.4,2.2L56.2,14c-1,1.4,0.6,3.2,2.1,2.4l2.7-1.4
	c1.7-0.9,3.3,1.4,1.8,2.7l-2.2,1.9c-1.3,1.1-0.2,3.3,1.5,2.8l2.9-0.7c1.9-0.5,2.9,2.2,1.1,3.1l-2.5,1.3c-1.5,0.8-1,3.1,0.8,3.1
	l2.9,0c2,0,2.3,2.8,0.4,3.2l-2.8,0.7c-1.7,0.4-1.7,2.8,0,3.2l2.8,0.7c1.9,0.5,1.6,3.3-0.4,3.2l-2.9,0c-1.7,0-2.3,2.3-0.8,3.1
	l2.5,1.3c1.7,0.9,0.8,3.5-1.1,3.1L62.1,47c-1.7-0.4-2.8,1.7-1.5,2.8l2.2,1.9c1.5,1.3-0.1,3.6-1.8,2.7L58.3,53
	c-1.5-0.8-3.1,1-2.1,2.4l1.7,2.4c1.1,1.6-1,3.5-2.4,2.2l-2.3-2c-1.3-1.1-3.2,0.2-2.6,1.8l1.1,2.8c0.7,1.8-1.8,3.1-2.9,1.5l-1.8-2.6
	c-1-1.4-3.2-0.6-3,1.1l0.4,3.1c0.2,1.9-2.5,2.6-3.2,0.8l-1.1-3c-0.6-1.6-3-1.3-3.2,0.4l-0.4,3.1c-0.2,1.9-3,1.9-3.3,0l-0.4-3.1
	c-0.2-1.7-2.6-2-3.2-0.4l-1.1,3c-0.7,1.8-3.4,1.1-3.2-0.8l0.4-3.1c0.2-1.7-2-2.6-3-1.1l-1.8,2.6c-1.1,1.6-3.6,0.3-2.9-1.5l1.1-2.8
	c0.6-1.6-1.3-3-2.6-1.8l-2.3,2c-1.5,1.3-3.6-0.6-2.4-2.2l1.7-2.4c1-1.4-0.6-3.2-2.1-2.4l-2.7,1.4c-1.7,0.9-3.3-1.4-1.8-2.7L9,49.8
	c1.3-1.1,0.2-3.3-1.5-2.8l-2.9,0.7c-1.9,0.5-2.9-2.2-1.1-3.1L6,43.3c1.5-0.8,1-3.1-0.8-3.1l-2.9,0c-2,0-2.3-2.8-0.4-3.2l2.8-0.7
	c1.7-0.4,1.7-2.8,0-3.2L2,32.4c-1.9-0.5-1.6-3.3,0.4-3.2l2.9,0c1.7,0,2.3-2.3,0.8-3.1l-2.5-1.3c-1.7-0.9-0.8-3.5,1.1-3.1l2.9,0.7
	c1.7,0.4,2.8-1.7,1.5-2.8l-2.2-1.9c-1.5-1.3,0.1-3.6,1.8-2.7l2.7,1.4c1.5,0.8,3.1-1,2.1-2.4l-1.7-2.4c-1.1-1.6,1-3.5,2.4-2.2l2.3,2
	c1.3,1.1,3.2-0.2,2.6-1.8L18,6.7c-0.7-1.8,1.8-3.1,2.9-1.5l1.8,2.6c1,1.4,3.2,0.6,3-1.1l-0.4-3.1c-0.2-1.9,2.5-2.6,3.2-0.8l1.1,3
	c0.6,1.6,3,1.3,3.2-0.4l0.4-3.1C33.4,0.3,36.2,0.3,36.4,2.2z"/>
        </>,
        viewBox: "0 0 69.6 69.4",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.CALLOUTS],
        size: { width: 69.6, height: 69.4 },
    },
    Callout12: {
        image: <>
            <path className="st0" d="M40.7,2l0.8,6.8c0.2,1.5,2.3,1.8,2.8,0.3l2.5-6.4c0.6-1.6,3.1-1,2.8,0.7l-0.8,6.8c-0.2,1.5,1.8,2.3,2.7,1
	l3.9-5.6c1-1.4,3.2-0.2,2.6,1.4l-2.4,6.3C55,14.8,56.8,16,57.9,15l5.2-4.5c1.3-1.1,3.2,0.5,2.2,2l-3.9,5.5c-0.9,1.3,0.5,2.9,1.9,2.2
	l6-3.1c1.5-0.8,3,1.3,1.6,2.4l-5,4.4c-1.2,1-0.2,2.9,1.3,2.5l6.5-1.6c1.7-0.4,2.6,1.9,1,2.7l-5.9,3c-1.4,0.7-0.9,2.8,0.7,2.8l6.7,0
	c1.7,0,2,2.5,0.3,2.9l-6.5,1.6c-1.5,0.4-1.5,2.5,0,2.9l6.5,1.6c1.7,0.4,1.4,2.9-0.3,2.9l-6.7,0c-1.5,0-2.1,2.1-0.7,2.8l5.9,3
	c1.6,0.8,0.7,3.2-1,2.7L67.3,52c-1.5-0.4-2.5,1.5-1.3,2.5l5,4.4c1.3,1.1-0.1,3.2-1.6,2.4l-6-3.1c-1.4-0.7-2.8,0.9-1.9,2.2l3.9,5.5
	c1,1.4-0.9,3.1-2.2,2l-5.2-4.5c-1.2-1-2.9,0.2-2.3,1.6l2.4,6.3c0.6,1.6-1.6,2.8-2.6,1.4l-3.9-5.6c-0.9-1.3-2.9-0.5-2.7,1l0.8,6.8
	c0.2,1.7-2.2,2.3-2.8,0.7L44.4,69c-0.6-1.4-2.7-1.2-2.8,0.3l-0.8,6.8c-0.2,1.7-2.7,1.7-2.9,0L37,69.3c-0.2-1.5-2.3-1.8-2.8-0.3
	l-2.5,6.4c-0.6,1.6-3.1,1-2.8-0.7l0.8-6.8c0.2-1.5-1.8-2.3-2.7-1l-3.9,5.6c-1,1.4-3.2,0.2-2.6-1.4l2.4-6.3c0.6-1.4-1.2-2.7-2.3-1.6
	l-5.2,4.5c-1.3,1.1-3.2-0.5-2.2-2l3.9-5.5c0.9-1.3-0.5-2.9-1.9-2.2l-6,3.1c-1.5,0.8-3-1.3-1.6-2.4l5-4.4c1.2-1,0.2-2.9-1.3-2.5
	l-6.5,1.6c-1.7,0.4-2.6-1.9-1-2.7l5.9-3C11,47.1,10.5,45,8.9,45l-6.7,0c-1.7,0-2-2.5-0.3-2.9l6.5-1.6c1.5-0.4,1.5-2.5,0-2.9
	l-6.5-1.6c-1.7-0.4-1.4-2.9,0.3-2.9l6.7,0c1.5,0,2.1-2.1,0.7-2.8l-5.9-3c-1.6-0.8-0.7-3.2,1-2.7l6.5,1.6c1.5,0.4,2.5-1.5,1.3-2.5
	l-5-4.4c-1.3-1.1,0.1-3.2,1.6-2.4l6,3.1c1.4,0.7,2.8-0.9,1.9-2.2l-3.9-5.5c-1-1.4,0.9-3.1,2.2-2l5.2,4.5c1.2,1,2.9-0.2,2.3-1.6
	L20.5,7c-0.6-1.6,1.6-2.8,2.6-1.4l3.9,5.6c0.9,1.3,2.9,0.5,2.7-1l-0.8-6.8c-0.2-1.7,2.2-2.3,2.8-0.7l2.5,6.4
	c0.6,1.4,2.7,1.2,2.8-0.3L37.8,2C38,0.3,40.5,0.3,40.7,2z"/>
        </>,
        viewBox: "0 0 78.5 78.2",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.CALLOUTS],
        size: { width: 78.5, height: 78.2 },
    },
    Callout13: {
        image: <>
            <path className="st0" d="M33.4,0.1c1.2,7,11.3,7,12.5,0l0,0l0,0c-1,7,8.6,10.1,11.9,3.9l0,0l0,0c-3.1,6.4,5,12.3,10.1,7.4l0,0l0,0
	c-4.9,5.1,1,13.2,7.4,10.1l0,0l0,0c-6.3,3.3-3.2,12.9,3.9,11.9l0,0l0,0c-7,1.2-7,11.3,0,12.5l0,0l0,0c-7-1-10.1,8.6-3.9,11.9l0,0
	l0,0c-6.4-3.1-12.3,5-7.4,10.1l0,0l0,0c-5.1-4.9-13.2,1-10.1,7.4l0,0l0,0c-3.3-6.3-12.9-3.2-11.9,3.9l0,0l0,0c-1.2-7-11.3-7-12.5,0
	l0,0l0,0c1-7-8.6-10.1-11.9-3.9l0,0l0,0c3.1-6.4-5-12.3-10.1-7.4l0,0l0,0c4.9-5.1-1-13.2-7.4-10.1l0,0l0,0
	c6.3-3.3,3.2-12.9-3.9-11.9l0,0l0,0c7-1.2,7-11.3,0-12.5l0,0l0,0c7,1,10.1-8.6,3.9-11.9l0,0l0,0c6.4,3.1,12.3-5,7.4-10.1l0,0l0,0
	c5.1,4.9,13.2-1,10.1-7.4l0,0l0,0C24.8,10.3,34.4,7.2,33.4,0.1L33.4,0.1L33.4,0.1z"/>
        </>,
        viewBox: "0 0 79.3 79.3",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.CALLOUTS],
        size: { width: 79.3, height: 79.3 },
    },
    Banner1: {
        image: <>
            <g>
                <path className="st0" d="M1.1,36.7c0,0,16.2,4.5,21.2,0s3.9-33.3-1.4-28S4.5,11,4.5,11l5,11.2L1.1,36.7z" />
                <path className="st0" d="M90.8,36.7c0,0-16.2,4.5-21.2,0c-5-4.5-3.9-33.3,1.4-28c5.4,5.4,16.4,2.2,16.4,2.2l-5,11.2L90.8,36.7z" />
                <path className="st0" d="M72.8,33.7c0,0-12.4-3.1-26.9-3.1S19,33.7,19,33.7V6.6c0,0,11.4-5.9,26.8-5.9s26.9,5.9,26.9,5.9V33.7z" />
                <line className="st0" x1="19" y1="33.7" x2="22.3" y2="36.7" />
                <line className="st0" x1="72.8" y1="33.7" x2="69.3" y2="36.7" />
            </g>
        </>,
        viewBox: "0 0 91.9 39.5",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.BANNERS],
        size: { width: 91.9, height: 39.5 },
    },
    Banner2: {
        image: <>
            <g>
                <circle className="st0" cx="7.3" cy="64.4" r="6.6" />
                <path className="st1" d="M11.5,8.6c0,0,0,48.2,0,53.9s-3.9,8.4-3.9,8.4s50,0,56,0s5.9-9.5,5.9-9.5V12.7" />
                <path className="st0" d="M11.5,7.3L11.5,7.3c0-3.6,3-6.6,6.6-6.6l52.4,0c3.6,0,6.6,3,6.6,6.6v0c0,3.6-3,6.6-6.6,6.6H18
		C14.4,13.9,11.5,10.9,11.5,7.3z"/>
                <circle className="st2" cx="18" cy="7.5" r="6.6" />
                <path className="st2" d="M17.8,10.6c-1.8,0-3.2-1.5-3.2-3.2s1.5-3.2,3.2-3.2c1.8,0,3.2,1.5,3.2,3.2" />
            </g>
        </>,
        viewBox: "0 0 77.8 71.7",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.BANNERS],
        size: { width: 77.8, height: 71.7 },
    },
    Banner3: {
        image: <>
            <g>
                <g>
                    <polyline className="st0" points="6.3,29.6 24.6,29.6 24.6,7.4 9.2,7.4 		" />
                    <path className="st0" d="M5.4,29.6L5.4,29.6c-2.6,0-4.6-2.1-4.6-4.6V6.7c0-2.6,2.1-4.6,4.6-4.6h0C8,2.1,10,4.2,10,6.7V25
			C10,27.5,8,29.6,5.4,29.6z"/>
                    <circle className="st1" cx="5.5" cy="25" r="4.6" />
                    <path className="st1" d="M7.7,25.1c0,1.3-1,2.3-2.3,2.3s-2.3-1-2.3-2.3s1-2.3,2.3-2.3" />
                </g>
                <g>
                    <polyline className="st0" points="83.3,29.6 65.1,29.6 65.1,7.4 80.4,7.4 		" />
                    <path className="st0" d="M84.3,29.6L84.3,29.6c2.6,0,4.6-2.1,4.6-4.6V6.7c0-2.6-2.1-4.6-4.6-4.6h0c-2.6,0-4.6,2.1-4.6,4.6V25
			C79.6,27.5,81.7,29.6,84.3,29.6z"/>
                    <circle className="st1" cx="84.2" cy="25" r="4.6" />
                    <path className="st1" d="M81.9,25.1c0,1.3,1,2.3,2.3,2.3c1.3,0,2.3-1,2.3-2.3s-1-2.3-2.3-2.3" />
                </g>
                <rect x="21.8" y="0.8" className="st0" width="46.3" height="26.2" />
                <line className="st0" x1="21.8" y1="27" x2="24.6" y2="29.6" />
                <line className="st0" x1="68.1" y1="27" x2="65.1" y2="29.6" />
            </g>
        </>,
        viewBox: "0 0 89.7 30.4",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.BANNERS],
        size: { width: 89.7, height: 30.4 },
    },
    Banner4: {
        image: <>
            <g>
                <circle className="st0" cx="7.4" cy="7.4" r="6.7" />
                <path className="st1" d="M64,11.3c0,0-48.9,0-54.7,0s-8.6-4-8.6-4s0,50.8,0,56.8s9.6,6,9.6,6h49.5" />
                <path className="st0" d="M65.3,11.3L65.3,11.3c3.7,0,6.7,3,6.7,6.7v53.2c0,3.7-3,6.7-6.7,6.7h0c-3.7,0-6.7-3-6.7-6.7V18
		C58.7,14.3,61.7,11.3,65.3,11.3z"/>
                <circle className="st2" cx="65.2" cy="18" r="6.7" />
                <path className="st2" d="M62,17.8c0-1.8,1.5-3.3,3.3-3.3c1.8,0,3.3,1.5,3.3,3.3S67.1,21,65.3,21" />
            </g>
        </>,
        viewBox: "0 0 72.8 78.6",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.BANNERS],
        size: { width: 72.8, height: 78.6 },
    },
    Banner5: {
        image: <>
            <g>
                <polygon className="st0" points="1.2,32.6 21.3,32.6 21.3,8.1 4.3,8.1 7.3,18.8 	" />
                <polygon className="st0" points="86.2,32.6 66.1,32.6 66.1,8.1 83,8.1 80,18.8 	" />
                <rect x="18.2" y="0.8" className="st0" width="51.1" height="28.9" />
                <line className="st0" x1="18.2" y1="29.7" x2="21.3" y2="32.6" />
                <line className="st0" x1="69.2" y1="29.7" x2="65.9" y2="32.6" />
            </g>
        </>,
        viewBox: "0 0 87.4 33.3",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.BANNERS],
        size: { width: 87.4, height: 33.3 },
    },
    Clouds3dnetwork: {
        image: <>
            <g>
                <path className="st0" d="M37.7,29.1h19.5c6.2,0,11.3-4.9,11.5-11.1C68.9,11.8,64.2,6.6,58,6.1c-2.5-3.9-7.1-6-11.6-5.2
		c-4.6,0.8-8.2,4.2-9.3,8.7c-5.3,0.3-9.3,4.7-9.2,10C28.1,24.9,32.4,29.1,37.7,29.1z"/>
                <path className="st0" d="M34.8,32.4h19.5c6.2,0,11.3-4.9,11.5-11.1C66,15.2,61.3,9.9,55.2,9.4c-2.5-3.9-7.1-6-11.6-5.2
		C39,5,35.3,8.4,34.3,12.9c-5.3,0.3-9.3,4.7-9.2,10C25.3,28.2,29.6,32.4,34.8,32.4z"/>
                <polyline className="st1" points="42.7,40.8 23.6,40.8 23.6,51.5 	" />
                <polyline className="st1" points="48.2,40.8 68.2,40.8 68.2,51.5 	" />
                <circle className="st0" cx="45.4" cy="40.9" r="2.5" />
                <line className="st1" x1="45.4" y1="38.3" x2="45.4" y2="32.2" />
                <g>
                    <rect x="0.8" y="51.8" className="st0" width="23.6" height="43.7" />
                    <line className="st1" x1="5.2" y1="63.6" x2="19.9" y2="63.6" />
                    <polygon className="st2" points="0.8,51.5 15.9,44.7 33.7,44.7 24.4,51.5 		" />
                    <polygon className="st2" points="24.5,95.4 33.9,80.3 33.9,44.8 24.5,51.7 		" />
                </g>
                <g>
                    <rect x="44.7" y="51.8" className="st0" width="23.6" height="43.7" />
                    <line className="st1" x1="49.2" y1="63.6" x2="63.8" y2="63.6" />
                    <polygon className="st2" points="44.7,51.5 59.9,44.7 77.7,44.7 68.3,51.5 		" />
                    <polygon className="st2" points="68.5,95.4 77.9,80.3 77.9,44.8 68.4,51.7 		" />
                </g>
            </g>
        </>,
        viewBox: "0 0 78.6 96.3",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 78.6, height: 96.3 },
    },
    Azure: {
        image: <>
            <g>
                <path id="path7291" className="st0" d="M23.3,4.4l-5.5,11.2l9.8,11.3L9.4,28.9l28.1,0.3L23.3,4.4L23.3,4.4z" />
                <path id="path7293" className="st0" d="M22.2,0L9.4,10.6L0,26.6l8-0.8L22.2,0z" />
                <path id="text7295" className="st1" d="M48.1,11.3L42,26.2h2.1l1.6-4.2h6.7l1.7,4.2h2.1L50,11.3H48.1L48.1,11.3z M49,13.1L49,13.1
		c0.1,0.5,0.2,0.8,0.3,1l2.5,6.4h-5.5l2.5-6.4C48.8,13.8,48.9,13.5,49,13.1L49,13.1z M96,15.3c-1.5,0-2.7,0.5-3.7,1.6
		c-1,1-1.5,2.4-1.5,4c0,1.8,0.5,3.1,1.4,4.1c0.9,1,2.2,1.4,3.8,1.4c1.6,0,3-0.3,3.9-1v-1.6c-1.1,0.8-2.2,1.2-3.5,1.2
		c-1.1,0-2-0.3-2.7-1c-0.6-0.6-1-1.6-1-2.7h8v-0.9c0-1.6-0.4-2.9-1.2-3.8C98.7,15.7,97.5,15.3,96,15.3L96,15.3z M87.9,15.3
		c-0.7,0-1.3,0.2-1.8,0.6c-0.5,0.4-0.9,1-1.2,1.7h0v-2.2h-1.8v10.7h1.8v-5.4c0-1.2,0.3-2.1,0.8-2.8c0.5-0.7,1.2-1,1.9-1
		c0.6,0,1.1,0.1,1.4,0.3v-1.8C88.8,15.4,88.4,15.3,87.9,15.3z M58,15.5V17H64l-6.7,8.7v0.5h9.3v-1.5H60l6.7-8.7v-0.5L58,15.5
		L58,15.5z M69.4,15.5v6.4c0,3,1.3,4.5,4,4.5c1.6,0,2.7-0.6,3.5-1.9h0v1.7h1.8V15.5H77v6.1c0,1-0.3,1.8-0.9,2.4
		C75.6,24.7,74.9,25,74,25c-1.8,0-2.7-1.1-2.7-3.4v-6.1L69.4,15.5L69.4,15.5z M96,16.7c0.9,0,1.6,0.3,2.1,0.8
		c0.5,0.5,0.8,1.3,0.8,2.3h-6.1c0.1-0.9,0.5-1.7,1.1-2.3C94.4,17,95.1,16.7,96,16.7z"/>
            </g>
        </>,
        viewBox: "0 0 100.7 29.2",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 100.7, height: 29.2 },
    },
    Cloudaccess: {
        image: <>
            <g>
                <path className="st0" d="M19.7,28.6h19.1c6.1,0,11.1-4.8,11.3-10.9C50.4,11.6,45.7,6.5,39.7,6c-2.4-3.8-6.9-5.9-11.4-5.1
		c-4.5,0.8-8.1,4.1-9.1,8.6c-5.2,0.3-9.1,4.7-9,9.8C10.3,24.5,14.5,28.6,19.7,28.6z"/>
                <line className="st1" x1="46" y1="26.3" x2="46" y2="54.4" />
                <path className="st0" d="M46,70c-4.4,0-8-3.6-8-8s3.6-8,8-8c4.4,0,8,3.6,8,8C53.9,66.4,50.4,70,46,70z" />
                <path className="st2" d="M21.3,28.3v6.6H10.1c-0.9,0-1.6,0.7-1.6,1.6v16.8" />
                <path className="st0" d="M8.7,70c-4.4,0-8-3.6-8-8s3.6-8,8-8c4.4,0,8,3.6,8,8C16.7,66.4,13.1,70,8.7,70z" />
                <polyline className="st1" points="48.3,23.3 64.9,23.3 64.9,65.2 	" />
                <path className="st0" d="M65.6,79.5c-3.8,0-6.9-3.1-6.9-6.9s3.1-6.9,6.9-6.9c3.8,0,6.9,3.1,6.9,6.9C72.5,76.4,69.4,79.5,65.6,79.5z" />
                <path className="st2" d="M35.6,29.5v5.5h-6.4c-0.9,0-1.6,0.7-1.6,1.6v6.8" />
                <circle className="st0" cx="28.1" cy="48.1" r="4.8" />
                <g>
                    <path className="st2" d="M66.1,80.7c1.3,2.2,3.8,5.3,5,7.1c0.9,1.3,1.8,2.6,2.4,3.6c0.5,0.9,3,5.1,3,5.2 M92.6,96.4
			c0.3-0.8,2.6-9.2,2.6-11.9v-7.4c0-1.8-1.5-3.2-3.4-3.2c-0.5,0-0.9,0.1-1.3,0.3c-0.5-1.2-1.7-2-3.1-2c-0.5,0-1,0.1-1.5,0.3
			c-0.6-1-2.4-1.7-3.7-1.7c-0.4,0-0.7,0.1-1.1,0.2L80,67.7c-1.1-2-2.2-2.9-4-2.9c-1.8,0-3.4,1.5-3.4,3.2l1.9,3.1v10"/>
                    <line className="st2" x1="81.2" y1="71" x2="81.2" y2="79.7" />
                    <line className="st2" x1="86" y1="72.6" x2="86" y2="80.5" />
                    <line className="st2" x1="90.5" y1="74" x2="90.5" y2="81.6" />
                </g>
            </g>
        </>,
        viewBox: "0 0 96 96.9",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 96, height: 96.9 },
    },
    Clouddata: {
        image: <>
            <g>
                <path className="st0" d="M39,12.8c6.6,0,11.6-2.6,11.6-6s-5-6-11.6-6s-11.6,2.6-11.6,6C27.4,10.2,32.4,12.8,39,12.8z" />
                <path className="st1" d="M27.7,14.8c1.3,2.7,5.8,4.5,11.3,4.5c2.6,0,5.2-0.4,7.2-1.2c2.2-0.9,3.7-2.1,4.2-3.6" />
                <path className="st1" d="M27.7,21.4c1.3,2.7,5.8,4.5,11.3,4.5c2.6,0,5.2-0.4,7.2-1.2c2.2-0.9,3.7-2.1,4.2-3.6" />
                <path className="st1" d="M27.7,27.9c1.3,2.7,5.8,4.5,11.3,4.5c2.6,0,5.2-0.4,7.2-1.2c2.2-0.9,3.7-2.1,4.2-3.6" />
                <path className="st1" d="M27.7,34.5c1.3,2.7,5.8,4.5,11.3,4.5c2.6,0,5.2-0.4,7.2-1.2c2.2-0.9,3.7-2.1,4.2-3.6" />
                <path className="st1" d="M27.7,41c1.3,2.7,5.8,4.5,11.3,4.5c2.6,0,5.2-0.4,7.2-1.2c2.2-0.9,3.7-2.1,4.2-3.6" />
                <path className="st0" d="M12.4,26.7c6.6,0,11.6-2.6,11.6-6s-5-6-11.6-6s-11.6,2.6-11.6,6C0.8,24.1,5.7,26.7,12.4,26.7z" />
                <path className="st1" d="M1.1,27.9c1.3,2.7,5.8,4.5,11.3,4.5c2.6,0,5.2-0.4,7.2-1.2c2.2-0.9,3.7-2.1,4.2-3.6" />
                <path className="st1" d="M1.1,34.5c1.3,2.7,5.8,4.5,11.3,4.5c2.6,0,5.2-0.4,7.2-1.2c2.2-0.9,3.7-2.1,4.2-3.6" />
                <path className="st1" d="M1.1,41c1.3,2.7,5.8,4.5,11.3,4.5c2.6,0,5.2-0.4,7.2-1.2c2.2-0.9,3.7-2.1,4.2-3.6" />
                <path className="st0" d="M53.2,88.3H15.3c-0.5,0-0.9-0.4-0.9-0.9V63.9c0-0.5,0.4-0.9,0.9-0.9h37.9c0.5,0,0.9,0.4,0.9,0.9v23.5
		C54,87.9,53.7,88.3,53.2,88.3z"/>
                <line className="st1" x1="14.4" y1="91.3" x2="54.6" y2="91.3" />
                <g>
                    <g>
                        <line className="st1" x1="5.7" y1="45.5" x2="5.7" y2="47.5" />
                        <line className="st2" x1="5.7" y1="51.9" x2="5.7" y2="76.3" />
                        <polyline className="st1" points="5.7,78.5 5.7,80.6 7.7,80.6 			" />
                        <line className="st1" x1="10.4" y1="80.6" x2="12.4" y2="80.6" />
                    </g>
                </g>
                <g>
                    <path className="st0" d="M64.7,94c0-7.5,6.1-13.6,13.6-13.6C85.9,80.3,92,86.4,92,94 M79,79.1c-4.1,0-7.5-3.4-7.5-7.5
			c0-4.1,3.4-7.5,7.5-7.5c4.1,0,7.5,3.4,7.5,7.5C86.5,75.8,83.2,79.1,79,79.1z"/>
                </g>
                <path className="st0" d="M48.9,56.3h26.2c8.3,0,15.1-6.6,15.4-14.9c0.3-8.3-6-15.4-14.3-16c-3.3-5.3-9.5-8-15.6-7
		c-6.1,1-11,5.6-12.5,11.7c-7.1,0.4-12.5,6.4-12.3,13.4C36.1,50.7,41.9,56.3,48.9,56.3z"/>
            </g>
        </>,
        viewBox: "0 0 92.8 94",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 92.8, height: 94 },
    },
    Cloudnetworks: {
        image: <>
            <g>
                <path className="st0" d="M25.4,30.3h20.3c6.4,0,11.7-5.1,12-11.5C57.9,12.3,53,6.8,46.6,6.3C44,2.3,39.2,0.1,34.4,0.9
		c-4.8,0.8-8.6,4.4-9.7,9.1c-5.5,0.3-9.7,4.9-9.6,10.4C15.4,25.9,19.9,30.3,25.4,30.3z"/>
                <polyline className="st1" points="33.5,39.1 11.7,39.1 11.7,50.2 	" />
                <polyline className="st1" points="39.3,39.1 61.9,39.1 61.9,50.2 	" />
                <circle className="st1" cx="36.4" cy="39.2" r="2.6" />
                <rect x="0.8" y="50.5" className="st0" width="24.6" height="45.5" />
                <line className="st1" x1="5.4" y1="62.8" x2="20.7" y2="62.8" />
                <rect x="48.2" y="50.5" className="st0" width="24.6" height="45.5" />
                <line className="st1" x1="52.9" y1="62.8" x2="68.2" y2="62.8" />
                <line className="st1" x1="36.4" y1="36.4" x2="36.4" y2="30.1" />
            </g>
        </>,
        viewBox: "0 0 73.6 96.8",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 73.6, height: 96.8 },
    },
    Clomputer: {
        image: <>
            <g>
                <path className="st0" d="M68,88.1H3.1c-0.7,0-1.3-0.6-1.3-1.4l4.7-9.4c0.4-0.9,0.9-1.5,1.6-1.5h56.3c0.7,0,1.4,0.4,1.7,1.6l3.2,9.4
		C69.3,87.5,68.7,88.1,68,88.1z"/>
                <line className="st1" x1="7.9" y1="80" x2="53.4" y2="80" />
                <line className="st1" x1="5.8" y1="83.9" x2="53.8" y2="83.9" />
                <line className="st1" x1="56.1" y1="80" x2="64.7" y2="80" />
                <line className="st1" x1="57.4" y1="83.8" x2="66" y2="83.8" />
                <path className="st0" d="M97.3,55.1V5.4c0-2.5-1.4-4.6-3.2-4.6H68c-1.8,0-3.2,2.1-3.2,4.6v63.8c0,2.5,1.4,4.6,3.2,4.6h26.1
		c1.8,0,3.2-2.1,3.2-4.6V53.8"/>
                <line className="st2" x1="78.1" y1="10.7" x2="84" y2="10.7" />
                <line className="st2" x1="78.1" y1="16.1" x2="84" y2="16.1" />
                <line className="st2" x1="78.1" y1="21.4" x2="84" y2="21.4" />
                <g>
                    <g>
                        <path className="st0" d="M41.6,73.8H30.9v-7.1h20.1c6,0,8.2-4.2,8.2-8.2V30.3c0-6-4.2-8.2-8.2-8.2h-42c-3.9,0-8.2,2.1-8.2,8.2v28.2
				c0,6,4.2,8.2,8.2,8.2H29v7.1H18.7"/>
                    </g>
                </g>
                <path className="st0" d="M92.9,86c0,2.5-14.8,2.5-14.8,0s3.3-7.6,7.4-7.6S92.9,83.4,92.9,86z" />
            </g>
        </>,
        viewBox: "0 0 73.6 96.8",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 73.6, height: 96.8 },
    },
    Computerdesk: {
        image: <>
            <g>
                <path className="st0" d="M6,53.4c0,0.4,0.1,0.8,0.1,1.2c0,12.1,0,24.2,0,36.3c0,1.6,0.8,2.7,2.5,2.9c1,0.1,1.9,0.1,2.9-0.1
		c1.6-0.3,2.4-1.1,2.4-2.7c0-11.6,0-23.2,0-34.8c0-0.9,0-1.9,0-2.8"/>
                <path className="st0" d="M79.2,53.4c0,0.4,0.1,0.8,0.1,1.2c0,12.1,0,24.2,0,36.4c0,1.4,0.7,2.6,2.5,2.8c0.9,0.1,1.8,0.1,2.7,0
		c1.9-0.3,2.5-1,2.5-2.9c0.1-2,0-4,0-5.9c0-5.2,0-10.3,0-15.5c0-0.8,0-1.7,0-2.5"/>
                <path className="st0" d="M44.2,39.4c0-6.9,0-13.8,0-20.7c0-1.5-1-2.7-2.7-2.7c-10.6,0.1-21.3,0.1-31.9,0c-1.7,0-2.7,0.5-2.8,2.6
		C6.7,21,6.7,37.4,6.9,39.8"/>
                <path className="st0" d="M46.5,73.4c0.6-0.3,1.2-0.4,1.9-0.4c3,0,6,0,9.1,0c3.4,0,5.6-2.9,5.5-5.3c0-1.1-0.8-1.8-1.8-1.9
		c-0.2,0-0.4,0-0.6,0c-9.2,0-18.4,0-27.7,0c-2.5,0-3.4,1.4-2.4,3.7c1,2.3,2.9,3.5,5.4,3.5c3,0,5.9,0,8.9,0
		C45.3,73.1,45.9,73.1,46.5,73.4"/>
                <path className="st0" d="M3.7,45.3c0-0.9-0.5-1.8-0.6-2.7c-0.1-1.5,0-2.6,2.2-2.8c1.2-0.1,2.2,0.1,3.3,0.1c11.2,0,22.4,0,33.6,0
		c0.1,0,0.1,0,0.2,0c1.2-0.3,2.3-0.1,3.5,0c1.6,0.1,2.4,1,2.1,2.6c-0.2,1-0.4,2-0.6,2.9"/>
                <path className="st0" d="M46.5,73.5c0.1,5.6-0.1,11.1,0.1,16.7" />
                <path className="st0" d="M58.1,94.7c0-0.6-0.1-1.1-0.6-1.5c-1.2-1.2-2.4-2.4-3.5-3.7c-0.8-0.8-1.7-1.1-2.7-1.1c-3.2,0-6.4,0-9.6,0
		c-1.4,0-2.5,0.8-3.4,1.8c-0.9,1.1-1.9,2.2-2.8,3.2c-0.3,0.3-0.5,0.7-0.5,1.1"/>
                <path className="st0" d="M87,53.4c0.2,1.6,0.1,3.2,0.1,4.8c0,1.2,0,2.5,0,3.7" />
                <path className="st0" d="M66.4,4.2c2.1,2.2,4.2,4.5,6.5,6.4" />
                <path className="st0" d="M87.1,53H3.8c-1.7,0-3.1-1.4-3.1-3.1v-1.3c0-1.7,1.4-3.1,3.1-3.1h83.3c1.7,0,3.1,1.4,3.1,3.1v1.3
		C90.2,51.6,88.8,53,87.1,53z"/>
                <rect x="67.4" y="40.6" className="st0" width="17.1" height="4.1" />
                <path className="st0" d="M92.1,23.4c0,1.8-1.5,3.3-3.3,3.3c-0.8,0-1.5-0.3-2-0.7c-0.8-0.6-1.3-1.5-1.3-2.6c0-1.8,1.5-3.3,3.3-3.3
		S92.1,21.6,92.1,23.4z"/>
                <line className="st0" x1="74" y1="40.3" x2="86.7" y2="26.5" />
                <path className="st0" d="M86.3,21.3L74.8,9.8c0.2-0.6,0.5-1.1,0.8-1.6c0.7-1.2,1-2.5,0.2-3.9c-1-1.7-2.2-3.1-4.3-3.5
		c-1-0.2-1.9,0.1-2.6,0.6c-0.9,0.7-1.9,1.3-2.4,2.5c-0.1,0.3-0.5,0.2-0.7,0.3C62.3,5,59,6.2,55.6,7.1c-1.3,0.3-1.5,1.7-0.6,2.6
		c4.1,4.1,8.2,8.2,12.3,12.3c0.8,0.8,2.2,0.8,2.7-0.8c0.8-2.8,1.6-5.5,2.4-8.3c0.1-0.4,0.3-0.9,0.3-1.3c0-0.6,0.3-1,0.8-1.2
		c0.4-0.1,0.8-0.4,1.1-0.6"/>
            </g>
        </>,
        viewBox: "0 0 92.9 94.7",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 92.9, height: 94.7 },
    },
    Desviceconfigs: {
        image: <>
            <g>
                <g>
                    <g>
                        <path className="st0" d="M30.5,41.1L31,75.9h21.2v7.7h-8c-1.1,0-1.9,0.8-1.9,1.9s0.9,1.9,1.9,1.9h25.6c1.1,0,1.9-0.8,1.9-1.9
				s-0.9-1.9-1.9-1.9h-8.8v-7.7H89c9.3,0,12.6-6.3,12.6-12.1V21.9c0-8.9-6.5-12.1-12.6-12.1H52.7"/>
                    </g>
                </g>
                <g>
                    <path className="st0" d="M32.2,44.8v45c0,2.4-2,4.4-4.4,4.4H5.1c-2.4,0-4.4-2-4.4-4.4V40.9c0-2.4,2-4.4,4.4-4.4h10.6" />
                    <ellipse className="st0" cx="16.5" cy="89.1" rx="2.4" ry="1.8" />
                    <line className="st0" x1="1.1" y1="83.3" x2="32.2" y2="83.3" />
                </g>
                <g>
                    <path className="st0" d="M58.1,22.1H53c-0.8,0-1.5-0.5-1.8-1.2s-0.2-1.6,0.4-2.1l3.6-3.6c0.5-0.5,0.8-1.2,0.8-2c0-0.8-0.3-1.5-0.8-2
			l-4.6-4.6c-1.1-1.1-2.9-1.1-4,0l-3.6,3.6c-0.6,0.6-1.4,0.7-2.1,0.4c-0.8-0.3-1.2-1-1.2-1.8V3.6c0-1.6-1.3-2.8-2.8-2.8h-6.5
			c-1.6,0-2.8,1.3-2.8,2.8v5.1c0,0.8-0.5,1.5-1.2,1.8c-0.8,0.3-1.6,0.2-2.1-0.4l-3.6-3.6c-1.1-1.1-2.9-1.1-4,0l-4.6,4.6
			c-0.5,0.5-0.8,1.2-0.8,2c0,0.8,0.3,1.5,0.8,2l3.6,3.6c0.6,0.6,0.7,1.4,0.4,2.1c-0.3,0.8-1,1.2-1.8,1.2H8.8c-1.6,0-2.8,1.3-2.8,2.8
			v6.5c0,1.6,1.3,2.8,2.8,2.8H14c0.8,0,1.5,0.5,1.8,1.2c0.3,0.8,0.2,1.6-0.4,2.1l-3.6,3.6c-0.5,0.5-0.8,1.2-0.8,2
			c0,0.8,0.3,1.5,0.8,2l4.6,4.6c1.1,1.1,2.9,1.1,4,0l3.6-3.6c0.6-0.6,1.4-0.7,2.1-0.4c0.8,0.3,1.2,1,1.2,1.8v5.1
			c0,1.6,1.3,2.8,2.8,2.8h6.5c1.6,0,2.8-1.3,2.8-2.8v-5.1c0-0.8,0.5-1.5,1.2-1.8c0.8-0.3,1.6-0.2,2.1,0.4l3.6,3.6
			c1.1,1.1,2.9,1.1,4,0l4.6-4.6c0.5-0.5,0.8-1.2,0.8-2c0-0.8-0.3-1.5-0.8-2l-3.6-3.6c-0.6-0.6-0.7-1.4-0.4-2.1
			c0.3-0.8,1-1.2,1.8-1.2h5.1c1.6,0,2.8-1.3,2.8-2.8v-6.5C60.9,23.4,59.7,22.1,58.1,22.1z"/>
                    <path className="st0" d="M33.5,19.1c-5,0-9.2,4.1-9.2,9.2s4.1,9.2,9.2,9.2s9.2-4.1,9.2-9.2S38.5,19.1,33.5,19.1z" />
                </g>
            </g>
        </>,
        viewBox: "0 0 102.3 94.9",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 102.3, height: 94.9},
    },
    Dashboardview: {
        image: <>
            <g>
                <g>
                    <path className="st0" d="M65.7,82.8h-17V71.5h31.9c9.6,0,13-6.7,13-13V13.7c0-9.6-6.7-13-13-13H13.7c-6.3,0-13,3.4-13,13v44.8
			c0,9.6,6.7,13,13,13h31.9v11.3H29.4"/>
                </g>
            </g>
            <path className="st1" d="M30.6,55.8c10.9,0,19.8-8.9,19.8-19.8s-8.9-19.8-19.8-19.8S10.9,25.1,10.9,36S19.7,55.8,30.6,55.8z" />
            <path className="st1" d="M30.6,44.5c4.7,0,8.5-3.8,8.5-8.5s-3.8-8.5-8.5-8.5s-8.5,3.8-8.5,8.5S26,44.5,30.6,44.5z" />
            <path className="st1" d="M67.4,19.2h17.2" />
            <path className="st1" d="M56.1,19.2h5.7" />
            <path className="st1" d="M67.4,41.8h17.2" />
            <path className="st1" d="M56.1,41.8h5.7" />
            <path className="st1" d="M56.1,30.5h28.5" />
            <path className="st1" d="M56.1,53.2h28.5" />
        </>,
        viewBox: "0 0 94.3 83.5",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 94.3, height: 83.5 },
    },
    Laptop: {
        image: <>
            <g>
                <path className="st0" d="M90.4,54.4H9.8c-1.1,0-1.9-0.9-1.9-1.9V2.7c0-1.1,0.9-1.9,1.9-1.9h80.5c1.1,0,1.9,0.9,1.9,1.9v49.8
		C92.3,53.5,91.4,54.4,90.4,54.4z"/>
                <path className="st0" d="M95.7,71H2.6c-1,0-1.8-0.8-1.8-1.8L7.5,57c0.6-1.2,1.2-1.9,2.2-1.9h80.8c1,0,2.1,0.5,2.4,2l4.6,12.1
		C97.5,70.2,96.7,71,95.7,71z"/>
                <line className="st1" x1="9.4" y1="60.5" x2="74.7" y2="60.5" />
                <line className="st1" x1="6.4" y1="65.5" x2="75.3" y2="65.5" />
                <line className="st1" x1="78.5" y1="60.5" x2="91" y2="60.5" />
                <line className="st1" x1="80.4" y1="65.4" x2="92.9" y2="65.4" />
            </g>
        </>,
        viewBox: "0 0 98.2 71.7",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 98.2, height: 71.7},
    },
    Mobile: {
        image: <>
            <path className="st0" d="M41.7,57.7V5.6c0-2.7-1.8-4.8-4-4.8H4.8c-2.2,0-4,2.2-4,4.8v66.9c0,2.7,1.8,4.8,4,4.8h32.9c2.2,0,4-2.2,4-4.8
	V56.4"/>
            <line className="st1" x1="17.5" y1="11.2" x2="25" y2="11.2" />
        </>,
        viewBox: "0 0 42.5 78.1",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 42.5, height: 78.1 },
    },
    Monitor: {
        image: <>
            <g>
                <path className="st0" d="M61.3,77.3H45.5V66.8h29.8c8.9,0,12.1-6.3,12.1-12.1V12.9c0-8.9-6.3-12.1-12.1-12.1H12.9
			C7,0.8,0.8,3.9,0.8,12.9v41.8c0,8.9,6.3,12.1,12.1,12.1h29.8v10.5H27.4"/>
            </g>
        </>,
        viewBox: "0 0 88.1 78",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 88.1, height: 78 },
    },
    Network: {
        image: <>
            <path className="st0" d="M67.3,26H29.4c-0.5,0-0.9-0.4-0.9-0.9V1.6c0-0.5,0.4-0.9,0.9-0.9h37.9c0.5,0,0.9,0.4,0.9,0.9v23.5
	C68.2,25.6,67.8,26,67.3,26z"/>
            <line className="st1" x1="28.6" y1="29" x2="68.8" y2="29" />
            <polyline className="st1" points="45.3,40 20.7,40 20.7,46.5 " />
            <polyline className="st1" points="49.6,40 74.2,40 74.2,46.5 " />
            <path className="st0" d="M37.8,71.9H3.3c-1.4,0-2.6-1.2-2.6-2.6v-20c0-1.4,1.2-2.6,2.6-2.6h34.5c1.4,0,2.6,1.2,2.6,2.6v20
	C40.4,70.7,39.2,71.9,37.8,71.9z"/>
            <line className="st1" x1="0.8" y1="74.9" x2="40.7" y2="74.9" />
            <path className="st0" d="M91.6,71.9H56.3c-1.2,0-2.2-1-2.2-2.2V48.9c0-1.2,1-2.2,2.2-2.2h35.3c1.2,0,2.2,1,2.2,2.2v20.9
	C93.8,70.9,92.8,71.9,91.6,71.9z"/>
            <line className="st1" x1="53.5" y1="74.9" x2="94.5" y2="74.9" />
            <line className="st1" x1="47.3" y1="29.9" x2="47.3" y2="37.9" />
            <circle className="st1" cx="47.3" cy="40.1" r="1.9" />
        </>,
        viewBox: "0 0 94.6 75.7",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 94.6, height: 75.7 },
    },
    Networks: {
        image: <>
            <g>
                <polyline className="st0" points="28.8,46.8 10.1,46.8 10.1,56.3 	" />
                <polyline className="st0" points="33.8,46.8 53.1,46.8 53.1,56.3 	" />
                <circle className="st0" cx="31.1" cy="46.9" r="2.2" />
                <rect x="0.8" y="0.8" className="st1" width="21.1" height="39" />
                <line className="st0" x1="4.7" y1="11.3" x2="17.9" y2="11.3" />
                <rect x="41.4" y="0.8" className="st1" width="21.1" height="39" />
                <line className="st0" x1="45.4" y1="11.3" x2="58.5" y2="11.3" />
                <rect x="0.8" y="56.6" className="st1" width="21.1" height="39" />
                <line className="st0" x1="4.7" y1="67.1" x2="17.9" y2="67.1" />
                <rect x="41.4" y="56.6" className="st1" width="21.1" height="39" />
                <line className="st0" x1="45.4" y1="67.1" x2="58.5" y2="67.1" />
                <g>
                    <g>
                        <line className="st0" x1="31.1" y1="20.3" x2="31.1" y2="21.3" />
                        <line className="st2" x1="31.1" y1="23.3" x2="31.1" y2="42.4" />
                        <line className="st0" x1="31.1" y1="43.4" x2="31.1" y2="44.4" />
                    </g>
                </g>
                <g>
                    <g>
                        <line className="st0" x1="41.8" y1="19.7" x2="40.8" y2="19.7" />
                        <line className="st3" x1="38.8" y1="19.7" x2="24" y2="19.7" />
                        <line className="st0" x1="23" y1="19.7" x2="22" y2="19.7" />
                    </g>
                </g>
            </g>
        </>,
        viewBox: "0 0 63.3 96.4",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 63.3, height: 96.4 },
    },
    Networkuser: {
        image: <>
            <g>
                <g>
                    <g>
                        <path className="st0" d="M26.1,32.7h-6.6v-4.4h12.4c3.7,0,5.1-2.6,5.1-5.1V5.8c0-3.7-2.6-5.1-5.1-5.1H5.8c-2.4,0-5.1,1.3-5.1,5.1
				v17.5c0,3.7,2.6,5.1,5.1,5.1h12.4v4.4h-6.3"/>
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st0" d="M84.6,32.7h-6.6v-4.4h12.4c3.7,0,5.1-2.6,5.1-5.1V5.8c0-3.7-2.6-5.1-5.1-5.1H64.3c-2.4,0-5.1,1.3-5.1,5.1
				v17.5c0,3.7,2.6,5.1,5.1,5.1h12.4v4.4h-6.3"/>
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st0" d="M26.1,87.4h-6.6V83h12.4c3.7,0,5.1-2.6,5.1-5.1V60.5c0-3.7-2.6-5.1-5.1-5.1H5.8c-2.4,0-5.1,1.3-5.1,5.1V78
				c0,3.7,2.6,5.1,5.1,5.1h12.4v4.4h-6.3"/>
                    </g>
                </g>
                <path className="st1" d="M36.5,14.5h23.3" />
                <path className="st1" d="M18.8,31.6V55" />
                <g>
                    <g>
                        <line className="st1" x1="37.1" y1="70.3" x2="39.2" y2="70.3" />
                        <line className="st2" x1="43.2" y1="70.3" x2="73.1" y2="70.3" />
                        <polyline className="st1" points="75.1,70.3 77.1,70.3 77.1,68.3 			" />
                        <line className="st3" x1="77.1" y1="64.5" x2="77.1" y2="36.7" />
                        <line className="st1" x1="77.1" y1="34.8" x2="77.1" y2="32.8" />
                    </g>
                </g>
                <g>
                    <path className="st0" d="M62.5,78.2c0-7.5,6.1-13.6,13.6-13.6c7.5,0,13.6,6.1,13.6,13.6 M76.8,63.4c-4.1,0-7.5-3.4-7.5-7.5
			s3.4-7.5,7.5-7.5c4.1,0,7.5,3.4,7.5,7.5S80.9,63.4,76.8,63.4z"/>
                </g>
            </g>
        </>,
        viewBox: "0 0 96.2 88.2",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 96.2, height: 88.2 },
    },
    Printer: {
        image: <>
            <g>
                <path className="st0" d="M70.4,25.9V15.4c0-2.2-0.5-3.9-2.2-5.5l-7-7C59.8,1.5,58,0.8,56,0.8H18.1c-1.4,0-2.5,1.1-2.5,2.5v22.5" />
                <path className="st1" d="M5.7,25.9c-2.9,1-5,3.8-5,7V58c0,4.1,3.3,7.4,7.4,7.4h7.4v17.3c0,1.4,1.1,2.5,2.5,2.5h49.9
		c1.4,0,2.5-1.1,2.5-2.5V65.5h7.4c4.1,0,7.4-3.3,7.4-7.4V32.9c0-3.2-2.1-6-5-7"/>
                <polyline className="st1" points="69.9,12.3 57.8,12.3 57.8,0.9 	" />
                <path className="st1" d="M70.4,60.5v-5h2.5c1.4,0,2.5-1.1,2.5-2.5s-1.1-2.5-2.5-2.5H13.1c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5h2.5v5
		"/>
                <line className="st1" x1="5.9" y1="26" x2="80.5" y2="26" />
                <g>
                    <g>
                        <path className="st1" d="M23,35.4h-9.9c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5H23c1.4,0,2.5-1.1,2.5-2.5S24.4,35.4,23,35.4z" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st1" d="M28,65.5h30" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st1" d="M28,75.4h30" />
                    </g>
                </g>
            </g>
        </>,
        viewBox: "0 0 86 86",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 86, height: 86 },
    },
    Servers: {
        image: <>
            <g>
                <path className="st0" d="M70.2,96.3H6.6c-3.2,0-5.9-2.6-5.9-5.9V80c0-3.2,2.6-5.9,5.9-5.9h63.6c3.2,0,5.9,2.6,5.9,5.9v10.5
		C76.1,93.7,73.4,96.3,70.2,96.3z"/>
                <circle className="st1" cx="66.3" cy="85.5" r="2.1" />
                <circle className="st1" cx="59" cy="85.5" r="2.1" />
                <circle className="st1" cx="51.7" cy="85.5" r="2.1" />
                <line className="st1" x1="10.5" y1="79.9" x2="10.5" y2="91" />
                <line className="st1" x1="14.4" y1="79.9" x2="14.4" y2="91" />
                <line className="st1" x1="18.2" y1="79.9" x2="18.2" y2="91" />
                <line className="st1" x1="22" y1="79.9" x2="22" y2="91" />
                <line className="st1" x1="25.9" y1="79.9" x2="25.9" y2="91" />
                <path className="st0" d="M70.2,71.9H6.6c-3.2,0-5.9-2.6-5.9-5.9V55.6c0-3.2,2.6-5.9,5.9-5.9h63.6c3.2,0,5.9,2.6,5.9,5.9v10.5
		C76.1,69.3,73.4,71.9,70.2,71.9z"/>
                <circle className="st1" cx="66.3" cy="61" r="2.1" />
                <circle className="st1" cx="59" cy="61" r="2.1" />
                <circle className="st1" cx="51.7" cy="61" r="2.1" />
                <line className="st1" x1="10.5" y1="55.5" x2="10.5" y2="66.6" />
                <line className="st1" x1="14.4" y1="55.5" x2="14.4" y2="66.6" />
                <line className="st1" x1="18.2" y1="55.5" x2="18.2" y2="66.6" />
                <line className="st1" x1="22" y1="55.5" x2="22" y2="66.6" />
                <line className="st1" x1="25.9" y1="55.5" x2="25.9" y2="66.6" />
                <path className="st0" d="M70.2,47.5H6.6c-3.2,0-5.9-2.6-5.9-5.9V31.2c0-3.2,2.6-5.9,5.9-5.9h63.6c3.2,0,5.9,2.6,5.9,5.9v10.5
		C76.1,44.9,73.4,47.5,70.2,47.5z"/>
                <circle className="st1" cx="66.3" cy="36.6" r="2.1" />
                <circle className="st1" cx="59" cy="36.6" r="2.1" />
                <circle className="st1" cx="51.7" cy="36.6" r="2.1" />
                <line className="st1" x1="10.5" y1="31" x2="10.5" y2="42.2" />
                <line className="st1" x1="14.4" y1="31" x2="14.4" y2="42.2" />
                <line className="st1" x1="18.2" y1="31" x2="18.2" y2="42.2" />
                <line className="st1" x1="22" y1="31" x2="22" y2="42.2" />
                <line className="st1" x1="25.9" y1="31" x2="25.9" y2="42.2" />
                <path className="st0" d="M70.2,23H6.6c-3.2,0-5.9-2.6-5.9-5.9V6.6c0-3.2,2.6-5.9,5.9-5.9h63.6c3.2,0,5.9,2.6,5.9,5.9v10.5
		C76.1,20.3,73.4,23,70.2,23z"/>
                <circle className="st1" cx="66.3" cy="12.1" r="2.1" />
                <circle className="st1" cx="59" cy="12.1" r="2.1" />
                <circle className="st1" cx="51.7" cy="12.1" r="2.1" />
                <line className="st1" x1="10.5" y1="6.5" x2="10.5" y2="17.7" />
                <line className="st1" x1="14.4" y1="6.5" x2="14.4" y2="17.7" />
                <line className="st1" x1="18.2" y1="6.5" x2="18.2" y2="17.7" />
                <line className="st1" x1="22" y1="6.5" x2="22" y2="17.7" />
                <line className="st1" x1="25.9" y1="6.5" x2="25.9" y2="17.7" />
            </g>
        </>,
        viewBox: "0 0 76.8 97.1",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 76.8, height: 97.1 },
    },
    Servers2: {
        image: <>
            <g>
                <g>
                    <rect x="0.8" y="0.8" className="st0" width="41.5" height="79" />
                    <line className="st1" x1="8.6" y1="11.6" x2="34.4" y2="11.6" />
                    <line className="st1" x1="8.6" y1="20" x2="34.4" y2="20" />
                    <line className="st1" x1="8.6" y1="28.5" x2="34.4" y2="28.5" />
                    <line className="st1" x1="8.6" y1="36.9" x2="34.4" y2="36.9" />
                    <line className="st1" x1="8.6" y1="45.4" x2="34.4" y2="45.4" />
                    <line className="st1" x1="8.6" y1="53.8" x2="34.4" y2="53.8" />
                    <line className="st1" x1="8.6" y1="62.2" x2="34.4" y2="62.2" />
                    <line className="st1" x1="8.6" y1="70.7" x2="34.4" y2="70.7" />
                </g>
                <g>
                    <rect x="47.6" y="0.8" className="st0" width="41.5" height="79" />
                    <line className="st1" x1="55.4" y1="11.6" x2="81.3" y2="11.6" />
                    <line className="st1" x1="55.4" y1="20" x2="81.3" y2="20" />
                    <line className="st1" x1="55.4" y1="28.5" x2="81.3" y2="28.5" />
                    <line className="st1" x1="55.4" y1="36.9" x2="81.3" y2="36.9" />
                    <line className="st1" x1="55.4" y1="45.4" x2="81.3" y2="45.4" />
                    <line className="st1" x1="55.4" y1="53.8" x2="81.3" y2="53.8" />
                    <line className="st1" x1="55.4" y1="62.2" x2="81.3" y2="62.2" />
                    <line className="st1" x1="55.4" y1="70.7" x2="81.3" y2="70.7" />
                </g>
            </g>
        </>,
        viewBox: "0 0 89.8 80.5",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 89.8, height: 80.5 },
    },
    Tab: {
        image: <>
            <path className="st0" d="M64.6,26.5V7c0-3.5-2.8-6.3-6.3-6.3H7C3.6,0.8,0.8,3.6,0.8,7v86.6c0,3.5,2.8,6.3,6.3,6.3h51.3
	c3.5,0,6.3-2.8,6.3-6.3V72.8V26.5z M1.4,83.6h63.1"/>
            <path className="st0" d="M32.7,93.8c-1.7,0-3.1-1.4-3.1-3.1c0-1.7,1.4-3.1,3.1-3.1c1.7,0,3.1,1.4,3.1,3.1C35.7,92.4,34.4,93.8,32.7,93.8
	z"/>
        </>,
        viewBox: "0 0 65.4 100.6",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 65.4, height: 100.6},
    },
    Usergroup: {
        image: <>
            <g>
                <g>
                    <path className="st0" d="M0.8,55.2c0-7.5,6.1-13.7,13.7-13.7s13.7,6.1,13.7,13.7 M15.1,40.4c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5
			s7.5,3.4,7.5,7.5S19.2,40.4,15.1,40.4z"/>
                </g>
                <g>
                    <path className="st0" d="M29.6,30.6c0-7.5,6.1-13.7,13.7-13.7S57,23.1,57,30.6 M44,15.8c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5
			s7.5,3.4,7.5,7.5S48.1,15.8,44,15.8z"/>
                </g>
                <g>
                    <path className="st0" d="M29.6,85.7c0-7.5,6.1-13.7,13.7-13.7S57,78.1,57,85.7 M44,70.8c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5
			s7.5,3.4,7.5,7.5S48.1,70.8,44,70.8z"/>
                </g>
                <g>
                    <path className="st0" d="M59.5,65c0-7.5,6.1-13.7,13.7-13.7S86.9,57.5,86.9,65 M73.9,50.2c-4.1,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5
			s7.5,3.4,7.5,7.5S78,50.2,73.9,50.2z"/>
                </g>
                <path className="st1" d="M24.2,77.6H16c-8.4,0-15.3-6.9-15.3-15.3" />
                <path className="st1" d="M57.3,13.9h8.1c8.4,0,15.3,6.9,15.3,15.3" />
            </g>
        </>,
        viewBox: "0 0 87.6 85.7",
        hideTextInput: true,
        keepAspectRatio: true,
        category: [Categories.TECH],
        size: { width: 87.6, height: 85.7},
    },
    Ban: {
        image: <>
            <g>
                <circle className="st0" cx="34.3" cy="34.3" r="33.5" />
                <line className="st1" x1="60.2" y1="13.5" x2="8.1" y2="54.6" />
            </g>
        </>,
        viewBox: "0 0 68.5 68.5",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 68.5, height: 68.5 },
    },
    Close: {
        image: <>
            <g>
                <path className="st0" d="M33.8,0.8c-18.2,0-33,14.8-33,33s14.8,33,33,33s33-14.8,33-33S52,0.8,33.8,0.8z" />
            </g>
            <line className="st1" x1="44.7" y1="22.4" x2="22.9" y2="45.2" />
            <line className="st1" x1="22.9" y1="22.4" x2="44.7" y2="45.2" />
        </>,
        viewBox: "0 0 67.6 67.6",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 67.6, height: 67.6 },
    },
    Cloud: {
        image: <>
            <g>
                <path className="st0" d="M55.6,50.8c5.8,0.1,9.9,0.2,9.9,0.2C76.8,51,86,41.8,86,30.6s-9.2-20.4-20.4-20.4c-2.3,0-4.5,0.4-6.6,1.1l0,0
		C56.3,5,50.1,0.8,43,0.8c-4.3,0-8.2,1.6-11.3,4.1c-1.6-1.1-3.5-1.7-5.6-1.7C20.5,3.2,16,7.7,16,13.3c0,0.9,0.1,1.9,0.4,2.7
		C7.6,16.8,0.8,24.1,0.8,33c0,9,7,16.4,15.9,16.9c0.1,0,5.5,0.1,12.6,0.3"/>
                <g>
                    <g>
                        <polyline className="st1" points="25.8,36.4 41.9,20.5 58.9,36.4 			" />
                    </g>
                    <line className="st1" x1="41.9" y1="20.5" x2="41.9" y2="69" />
                </g>
            </g>
        </>,
        viewBox: "0 0 86.7 69.7",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 86.7, height: 69.7 },
    },
    CloudSettings: {
        image: <>
            <g>
                <g>
                    <g>
                        <path className="st0" d="M2.4,17.3c0-4.5,5.9-16.5,18-16.5c8.1-0.5,14.1,5.5,16,11c3.7-2.7,8.5-1.3,10.8,3c0.7,1.4,1.1,4,1.2,5.7" />
                    </g>
                </g>
                <path className="st0" d="M14.7,66.2c-1.2-0.2-2.4-0.5-3.5-1C6,63.2,1.9,58.4,0.9,52.6C0.2,47.8,1.6,43,4.7,39.4
		c3.1-3.6,7.6-5.7,12.4-5.7c0,0,0.2,0,0.3,0c0.9,0,1.6-0.6,1.8-1.5c1.4-8.3,7.9-14.9,16.2-16.4s16.6,2.4,20.8,9.7
		c0.3,0.5,0.9,0.9,1.5,0.9c5.5,0.2,10.6,2.6,14.3,6.6c3.6,4.1,5.4,10.3,5,15.7c-0.8,8.3-2.9,13-11.4,16.3"/>
                <g>
                    <path className="st1" d="M54.1,44.9h-2.8c-0.5,0-0.8-0.2-1-0.7s-0.1-0.9,0.2-1.2l2-2c0.3-0.3,0.5-0.7,0.5-1.1c0-0.4-0.2-0.8-0.5-1.1
			l-2.5-2.5c-0.6-0.6-1.6-0.6-2.2,0l-2,2c-0.3,0.3-0.8,0.4-1.2,0.2c-0.4-0.2-0.7-0.5-0.7-1v-2.8c0-0.9-0.7-1.5-1.5-1.5h-3.6
			c-0.9,0-1.5,0.7-1.5,1.5v2.8c0,0.5-0.2,0.8-0.7,1c-0.4,0.2-0.9,0.1-1.2-0.2l-2-2c-0.6-0.6-1.6-0.6-2.2,0l-2.5,2.5
			c-0.3,0.3-0.5,0.7-0.5,1.1c0,0.4,0.2,0.8,0.5,1.1l2,2c0.3,0.3,0.4,0.8,0.2,1.2s-0.5,0.7-1,0.7h-2.8c-0.9,0-1.5,0.7-1.5,1.5V50
			c0,0.9,0.7,1.5,1.5,1.5H30c0.5,0,0.8,0.2,1,0.7c0.2,0.4,0.1,0.9-0.2,1.2l-2,2c-0.3,0.3-0.5,0.7-0.5,1.1c0,0.4,0.2,0.8,0.5,1.1
			l2.5,2.5c0.6,0.6,1.6,0.6,2.2,0l2-2c0.3-0.3,0.8-0.4,1.2-0.2c0.4,0.2,0.7,0.5,0.7,1v2.8c0,0.9,0.7,1.5,1.5,1.5h3.6
			c0.9,0,1.5-0.7,1.5-1.5v-2.8c0-0.5,0.2-0.8,0.7-1c0.4-0.2,0.9-0.1,1.2,0.2l2,2c0.6,0.6,1.6,0.6,2.2,0l2.5-2.5
			c0.3-0.3,0.5-0.7,0.5-1.1c0-0.4-0.2-0.8-0.5-1.1l-2-2c-0.3-0.3-0.4-0.8-0.2-1.2c0.2-0.4,0.5-0.7,1-0.7h2.8c0.9,0,1.5-0.7,1.5-1.5
			v-3.6C55.6,45.6,54.9,44.9,54.1,44.9z"/>
                    <path className="st1" d="M40.6,43.2c-2.8,0-5,2.2-5,5c0,2.8,2.2,5,5,5c2.8,0,5-2.2,5-5C45.6,45.4,43.4,43.2,40.6,43.2z" />
                </g>
                <g>
                    <path className="st0" d="M14.9,67.8c-2.3,1.7-2.8,5-1,7.3c1,1.4,2.7,2.1,4.4,2.1c0.3,0,0.5-0.3,0.5-0.6c0-0.1,0-0.2-0.1-0.2l-1.7-2.8
			c-0.2-0.3-0.2-0.6,0-0.9c0.2-0.4,0.5-0.8,0.9-1c0.8-0.5,1.8-0.4,2.1,0.1l1.7,2.8c0,0,0.1,0.1,0.1,0.1c0.2,0.2,0.6,0.2,0.8,0
			c0.1-0.1,0.1-0.1,0.1-0.2c0.4-0.8,0.6-1.6,0.5-2.5c0-1.4-0.6-2.7-1.6-3.6c-0.5-0.5-1.1-0.9-1.8-1.1l-0.5-17.5
			c2.3-1.7,2.8-5,1.1-7.3c-0.8-1.1-2-1.8-3.3-2c-0.3-0.1-0.6,0.2-0.7,0.5c0,0.1,0,0.2,0,0.3l0.9,2.8c0.2,0.6-0.4,1.4-1.3,1.7
			c-0.9,0.3-1.8,0-2-0.6l-0.8-2.6c-0.1-0.3-0.4-0.5-0.7-0.4c-0.1,0-0.2,0.1-0.3,0.2c-1.8,2.2-1.5,5.5,0.7,7.3c0.5,0.4,1,0.7,1.5,0.9
			L14.9,67.8z"/>
                </g>
                <path className="st0" d="M62,61.1l-1.8,0c-0.6,0-1.1,0.5-1.2,1.2l0,0.8c0,0.6,0.5,1.1,1.1,1.1l0.1,11.2c0,0.6,0.5,1.1,1.1,1.2
		c0,0,0,0,0.1,0l2.7,0c0.6,0,1.1-0.5,1.2-1.1c0,0,0,0,0-0.1l-0.1-11.2c0.6,0,1.1-0.6,1.1-1.2l0-0.8c0-0.6-0.5-1.1-1.1-1.2
		c0,0,0,0-0.1,0l-3.9,0"/>
                <path className="st1" d="M61,60.9l-0.2-13.3c0-0.2-0.1-0.4-0.2-0.5l-1.3-1.4l1.1-5.4l4,0l1.3,5.3l-1.3,1.4c-0.1,0.1-0.2,0.3-0.2,0.5
		l0.1,13.3"/>
                <line className="st2" x1="20" y1="66.1" x2="60.1" y2="66.1" />
            </g>
        </>,
        viewBox: "0 0 77.8 77.9",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 77.8, height: 77.9 },
    },
    Database: {
        image: <>
            <g>
                <g>
                    <path className="st0" d="M55.5,37.7v1.3V24.8v-0.5V11.2v-0.5c0-0.2-0.1-0.4-0.2-0.5c-1.3-4.7-10.7-9.3-27.2-9.3S2.2,5.4,0.9,10.1
			c-0.1,0.2-0.2,0.3-0.2,0.5v0.5v13.1v0.5v12.6V38v13.1c0,0.2,0,0.3,0.1,0.5C2.2,57,13.7,61,28.1,61c3.5,0,8.6-0.7,11.8-1.1"/>
                </g>
                <g>
                    <circle className="st0" cx="47" cy="48.9" r="12.9" />
                    <g>
                        <polyline className="st1" points="41.6,50 46.4,53.3 54.2,42.2 			" />
                    </g>
                </g>
                <path className="st1" d="M55.2,9.6c0,4.2-11.1,8.8-27.1,8.8S1,13.8,1,9.6" />
                <path className="st1" d="M55.2,23.2c0,4.2-11.1,8.8-27.1,8.8S1,27.4,1,23.2" />
                <path className="st1" d="M34.8,45.4c-2.1,0.2-4.4,0.3-6.7,0.3C12.1,45.7,1,41,1,36.8" />
            </g>
        </>,
        viewBox: "0 0 60.6 62.6",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 60.6, height: 62.6 },
    },
    DataPiles: {
        image: <>
            <g>
                <path className="st0" d="M63.1,20.3c10.8,0,19-4.2,19-9.8s-8.1-9.8-19-9.8s-19,4.2-19,9.8C44.1,16.1,52.3,20.3,63.1,20.3z" />
                <path className="st1" d="M44.7,23.7c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
                <path className="st1" d="M44.7,34.4c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
                <path className="st1" d="M44.7,45c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
                <path className="st1" d="M44.7,55.7c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
                <path className="st1" d="M44.7,66.4c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
                <path className="st0" d="M19.7,43c10.8,0,19-4.2,19-9.8s-8.1-9.8-19-9.8s-19,4.2-19,9.8C0.8,38.8,8.9,43,19.7,43z" />
                <path className="st1" d="M1.3,45c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
                <path className="st1" d="M1.3,55.7c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
                <path className="st1" d="M1.3,66.4c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
            </g>
        </>,
        viewBox: "0 0 82.8 74.4",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 82.8, height: 74.4 },
    },
    Deployment: {
        image: <>
            <g>
                <path className="st0" d="M56.7,25.1c0-0.6,0-15,0-15h15.8v37.3" />
                <g>
                    <path className="st0" d="M47.8,78.5c0-7.8,6.3-14.1,14.1-14.1s14.1,6.3,14.1,14.1 M62.6,63.1c-4.3,0-7.8-3.5-7.8-7.8s3.5-7.8,7.8-7.8
			c4.3,0,7.8,3.5,7.8,7.8S66.9,63.1,62.6,63.1z"/>
                </g>
                <polyline className="st0" points="31.2,39.6 31.2,0.8 0.8,0.8 0.8,64.1 	" />
                <polyline className="st0" points="56.8,36.9 56.8,18.2 31.1,18.2 31.1,52.6 	" />
                <line className="st0" x1="8.1" y1="14.1" x2="24.4" y2="14.1" />
                <line className="st0" x1="63" y1="17" x2="68.7" y2="17" />
                <line className="st0" x1="63" y1="24.4" x2="68.7" y2="24.4" />
                <line className="st0" x1="63" y1="33" x2="68.7" y2="33" />
                <g>
                    <g>
                        <polyline className="st0" points="12.5,31.8 28.6,21.4 45.8,31.8 			" />
                    </g>
                    <line className="st0" x1="28.6" y1="21.4" x2="28.6" y2="39.3" />
                </g>
                <circle className="st0" cx="28.4" cy="59.2" r="20.2" />
                <circle className="st0" cx="28.4" cy="59.2" r="10.6" />
                <circle className="st0" cx="28.4" cy="58.7" r="2.7" />
                <path className="st0" d="M40.8,53.2c0.9,1.7,1.4,3.7,1.4,5.8c0,2.4-0.7,4.7-1.8,6.6" />
                <path className="st0" d="M37.2,47c2,1.3,3.6,3,4.7,5.1c1.1,2.1,1.8,4.4,1.8,7" />
            </g>
        </>,
        viewBox: "0 0 76.8 80.1",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 76.8, height: 80.1 },
    },
    Doc1: {
        image: <>
            <g>
                <g>
                    <path className="st0" d="M59,16.7l-1-1L44.8,2.5l-1-1C43.3,1,42.7,0.8,42,0.8H4C2.4,0.8,0.8,2,0.8,4.6v47.3v21.7v0.6
			c0,1.1,1.1,2.2,2.4,2.5c0.1,0,0.1,0,0.2,0.1c0.2,0,0.4,0.1,0.6,0.1h52.6c0.2,0,0.4,0,0.6-0.1c0.1,0,0.1,0,0.2-0.1
			c1.3-0.3,2.4-1.4,2.4-2.5v-0.6V51.9V19.1C59.8,18.1,59.6,17.3,59,16.7z"/>
                </g>
                <g>
                    <line className="st1" x1="9" y1="20.4" x2="38.2" y2="20.4" />
                    <line className="st1" x1="40.9" y1="20.4" x2="51.7" y2="20.4" />
                </g>
                <g>
                    <line className="st1" x1="9" y1="31.6" x2="30.3" y2="31.6" />
                    <line className="st1" x1="43.5" y1="31.6" x2="51.7" y2="31.6" />
                </g>
                <g>
                    <line className="st1" x1="9" y1="42.7" x2="35.6" y2="42.7" />
                    <line className="st1" x1="43.5" y1="42.7" x2="51.7" y2="42.7" />
                </g>
                <g>
                    <line className="st1" x1="9" y1="53.9" x2="27.7" y2="53.9" />
                    <line className="st1" x1="40.9" y1="53.9" x2="51.7" y2="53.9" />
                </g>
                <g>
                    <line className="st1" x1="9" y1="65" x2="32.9" y2="65" />
                    <line className="st1" x1="43.5" y1="65" x2="51.7" y2="65" />
                </g>
            </g>
        </>,
        viewBox: "0 0 60.5 77.6",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 60.5, height: 77.6 },
    },
    DocBlank: {
        image: <>
            <g>
                <g>
                    <path className="st0" d="M71.7,16.3l-15-15c-0.3-0.3-0.8-0.5-1.3-0.5h-46c-4.7,0-8.6,3.9-8.6,8.6v65.5c0,4.7,3.9,8.6,8.6,8.6h54.2
			c4.7,0,8.6-3.9,8.6-8.6V17.6C72.2,17.1,72,16.6,71.7,16.3z M53.6,0.8v9.9c0,2.3,0.9,4.5,2.5,6.1c1.6,1.6,3.4,2.5,6.1,2.5h9.9"/>
                </g>
            </g>
        </>,
        viewBox: "0 0 72.9 84.2",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 72.9, height: 84.2 },
    },
    DocumentFrom: {
        image: <>
            <g>
                <g>
                    <g>
                        <path className="st0" d="M51.2,11.8L40.5,1.1c-0.2-0.2-0.6-0.4-0.9-0.4H6.9c-3.4,0-6.1,2.7-6.1,6.1v46.6c0,3.4,2.7,6.1,6.1,6.1h38.6
				c3.4,0,6.1-2.7,6.1-6.1V12.7C51.6,12.4,51.5,12.1,51.2,11.8z M38.4,0.8v7.1c0,1.6,0.6,3.2,1.8,4.3c1.2,1.2,2.4,1.8,4.3,1.8h7.1"
                        />
                    </g>
                </g>
                <g>
                    <g>
                        <line className="st1" x1="27.7" y1="46.2" x2="45" y2="46.2" />
                        <g>
                            <polygon className="st2" points="42.8,53.7 55.7,46.2 42.8,38.7" />
                        </g>
                    </g>
                </g>
            </g>
        </>,
        viewBox: "0 0 55.7 60.4",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 55.7, height: 60.4 },
    },
    Documents: {
        image: <>
            <g>
                <g>
                    <g>
                        <path className="st0" d="M12.8,76.8c0,3.9,3.2,7.1,7,7.1h44.4c3.9,0,7-3.2,7-7.1V29.4c0-0.4-0.2-0.8-0.4-1l-4.3-4.5" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st0" d="M5.8,70.4c0,4,3.3,7.3,7.3,7.3h46c4,0,7.3-3.3,7.3-7.3V21.8c0-0.4-0.2-0.8-0.4-1.1l-4.9-5" />
                    </g>
                </g>
                <path className="st0" d="M60.8,13.9L48.1,1.2c-0.3-0.3-0.7-0.4-1.1-0.4H8C4,0.8,0.8,4,0.8,8v55.5c0,4,3.3,7.3,7.3,7.3h46
		c4,0,7.3-3.3,7.3-7.3V15C61.3,14.6,61.1,14.2,60.8,13.9z"/>
                <g> <path className="st1" d="M48.3,25.4H13.7" />  </g>
                <g> <path className="st1" d="M48.3,31.9H13.7" /></g>
                <g><path className="st1" d="M29.5,39.2H13.7" /> </g>
                <g>
                    <path className="st1" d="M22.4,46.5h-8.7" />
                </g>
                <g>
                    <path className="st1" d="M22.7,51.1h-9" />
                </g>
                <g>
                    <path className="st1" d="M35.9,46.5h-8.7" />
                </g>
                <g>
                    <path className="st1" d="M36.3,51.1h-9" />
                </g>
                <g>
                    <path className="st1" d="M49.5,46.5h-8.7" />
                </g>
                <g>
                    <path className="st1" d="M49.8,51.1h-9" />
                </g>
                <g>
                    <path className="st1" d="M32.4,57.5H13.7" />
                </g>
                <path className="st1" d="M45.5,0.8v8.4c0,1.9,0.8,3.8,2.1,5.1c1.4,1.4,2.9,2.1,5.1,2.1h8.4" />
            </g>
        </>,
        viewBox: "0 0 72 84.6",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 72, height: 84.6 },
    },
    Documents2: {
        image: <>
            <g>
                <path className="st0" d="M13.5,26.3c0,0-6.7,0-7.9,0s-5,0.1-5,5.1s-0.8,34.1,0,35c0.8,0.8,0.3,4.7,5.3,4.7s25.5,0,25.5,0
		s4.3,11,11.2,14.8s18.6,6.2,28.3,1.2c9.7-5,16.6-17.2,15.1-26.6s-6-15.3-8.7-18.2s-3.2-3.7-3.2-3.7v-29l-8.9-8.7c0,0-21.5,0-25.2,0
		S35.3,3,35.3,4.6s0,7.8,0,7.8s-14.2,0-16.2,0s-5.4,1-5.4,3.7S13.5,26.3,13.5,26.3z"/>
                <g>
                    <g>
                        <path className="st1" d="M39.4,40.2v-5.1c0-0.3-0.1-0.5-0.3-0.7L31,26.3c-0.2-0.2-0.4-0.3-0.7-0.3H5.4c-2.6,0-4.6,2.1-4.6,4.6v35.4
				c0,2.6,2.1,4.6,4.6,4.6h21.3 M29.4,26v5.4c0,1.2,0.5,2.4,1.4,3.3c0.9,0.9,1.9,1.4,3.3,1.4h5.4"/>
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st1" d="M52.2,34.3V21.1c0-0.3-0.1-0.5-0.3-0.7l-8.1-8.1c-0.2-0.2-0.4-0.3-0.7-0.3H18.2c-2.6,0-4.6,2.1-4.6,4.6v8.1
				 M42.1,12.1v5.4c0,1.2,0.5,2.4,1.4,3.3c0.9,0.9,1.9,1.4,3.3,1.4h5.4"/>
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st1" d="M74.1,38.5V9.8c0-0.3-0.1-0.5-0.3-0.7L65.7,1c-0.2-0.2-0.4-0.3-0.7-0.3H40.1c-2.6,0-4.6,2.1-4.6,4.6v5.3
				 M64,0.8v5.4c0,1.2,0.5,2.4,1.4,3.3c0.9,0.9,1.9,1.4,3.3,1.4h5.4"/>
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st1" d="M26.1,37.8H8.5" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st1" d="M26.1,44.7H8.5" />
                    </g>
                </g>
                <path className="st1" d="M75.9,83.8l-1.5-2.7l4.1-9.6c0.4-1,0.1-2.2-0.8-2.9l-3.3-2.2L74.5,55l3.5-4.4l5-0.8
		C88.8,61.4,85.9,75.5,75.9,83.8z M72.1,86.5c-7.7,4.4-17,5-25.2,1.4c-8.1-3.6-14.1-10.8-16-19.5 M37.6,43.5
		c5.6-6.1,13.6-9.4,21.9-9c8.3,0.4,15.9,4.4,20.9,11 M34.7,47.2l6.8,4.5c0.4,0.2,0.8,0.4,1.2,0.4L55,52.3l3.6,6.3l-7.1,4l-4,8.9
		l-7.1-7.4c-0.5-0.6-1.2-0.9-1.9-0.8l-8.1,0.5C30,58,31.5,52.2,34.7,47.2z"/>
            </g>
        </>,
        viewBox: "0 0 86.7 91",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 86.7, height: 91 },
    },
    DocumentsTo: {
        image: <>
            <g>
                <g>
                    <g>
                        <path className="st0" d="M62,11.6L51.5,1.1c-0.2-0.2-0.5-0.4-0.9-0.4H18.6c-3.3,0-6,2.7-6,6v45.7c0,3.3,2.7,6,6,6h37.8
				c3.3,0,6-2.7,6-6v-40C62.4,12.1,62.3,11.8,62,11.6z M49.4,0.8v6.9c0,1.6,0.6,3.1,1.8,4.2c1.1,1.1,2.4,1.8,4.2,1.8h6.9"/>
                    </g>
                </g>
                <g>
                    <g>
                        <line className="st1" x1="0" y1="13.3" x2="16.7" y2="13.3" />
                        <g>
                            <polygon className="st2" points="14.5,20.8 27.5,13.3 14.5,5.8 				" />
                        </g>
                    </g>
                </g>
            </g>
        </>,
        viewBox: "0 0 63.1 59.2",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 63.1, height: 59.2 },
    },
    DocumentsTransfer: {
        image: <>
            <g>
                <path className="st0" d="M29.8,39.5H4.8c-2.3,0-4.1-1.9-4.1-4.2V4.6c0-2.3,1.9-4.2,4.1-4.2h21.3l7.8,8.3v26.5
		C33.9,37.6,32,39.5,29.8,39.5z"/>
                <path className="st0" d="M65.8,68.6H40.8c-2.3,0-4.1-1.9-4.1-4.1V34c0-2.3,1.9-4.1,4.1-4.1h21.3l7.8,8.2v26.3
		C69.9,66.7,68.1,68.6,65.8,68.6z"/>
                <g>
                    <g>
                        <path className="st1" d="M69.5,37.3l-7-7c-0.2-0.2-0.4-0.2-0.6-0.2H40.5c-2.2,0-4,1.8-4,4v30.5c0,2.2,1.8,4,4,4h25.3c2.2,0,4-1.8,4-4
				V37.9C69.8,37.6,69.7,37.4,69.5,37.3z M61.1,30v4.6c0,1.1,0.4,2.1,1.2,2.8c0.8,0.8,1.6,1.2,2.8,1.2h4.6"/>
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st2" d="M62.6,43.6H43.6" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st2" d="M62.6,47.1H43.6" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st2" d="M52.3,51.2h-8.7" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st2" d="M48.3,55.2h-4.8" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st2" d="M48.5,57.7h-5" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st2" d="M55.8,55.2H51" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st2" d="M56,57.7h-5" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st2" d="M53.9,61.3H43.6" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st1" d="M33.8,8l-7-7c-0.2-0.2-0.4-0.2-0.6-0.2H4.8c-2.2,0-4,1.8-4,4v30.5c0,2.2,1.8,4,4,4H30c2.2,0,4-1.8,4-4V8.6
				C34.1,8.4,34,8.2,33.8,8z M25.4,0.8v4.6c0,1.1,0.4,2.1,1.2,2.8c0.8,0.8,1.6,1.2,2.8,1.2H34"/>
                    </g>
                </g>
                <path className="st2" d="M24.1,54.6h6l0,0c0.7,0,1.3-0.6,1.3-1.3v-6" />
                <line className="st2" x1="30.6" y1="53.8" x2="19.4" y2="42.7" />
            </g>
        </>,
        viewBox: "0 0 70.5 69.3",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 70.5, height: 69.3 },
    },
    Download: {
        image: <>
            <g>
                <path className="st0" d="M0.8,30.7v19.7c0,7.7,6.3,13.9,13.9,13.9h47.5c7.7,0,13.9-6.3,13.9-13.9V30.7" />
                <g>
                    <g>
                        <polyline className="st0" points="52.4,27.5 38.8,41.1 24.4,27.5 			" />
                    </g>
                    <line className="st1" x1="38.8" y1="41.1" x2="38.8" y2="0" />
                </g>
            </g>
        </>,
        viewBox: "0 0 76.9 65.1",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 76.9, height: 65.1 },
    },
    Edit: {
        image: <>
            <g>
                <path className="st0" d="M49.1,3.1C45.9,0,40.8,0,37.6,3.1L5.5,35.3c-0.2,0.2-0.4,0.5-0.5,0.8L0.8,51.3c-0.2,0.6,0,1.3,0.5,1.8
		c0.5,0.5,1.1,0.6,1.8,0.5l15.3-4.2c0.3-0.1,0.6-0.2,0.8-0.5l32.1-32.1c3.2-3.2,3.2-8.3,0-11.5L49.1,3.1z"/>
                <line className="st1" x1="1.9" y1="54.3" x2="55.4" y2="54.3" />
            </g>
        </>,
        viewBox: "0 0 56.4 55.3",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 56.4, height: 55.3 },
    },
    ERP: {
        image: <>
            <g>
                <g>
                    <path className="st0" d="M62.4,40.4h-3.5c-0.6,0-1-0.3-1.2-0.8s-0.1-1.1,0.3-1.5l2.5-2.5c0.4-0.4,0.6-0.8,0.6-1.4c0-0.5-0.2-1-0.6-1.4
			l-3.1-3.1c-0.7-0.7-2-0.7-2.7,0l-2.5,2.5c-0.4,0.4-0.9,0.5-1.5,0.3c-0.5-0.2-0.8-0.7-0.8-1.2v-3.5c0-1.1-0.9-1.9-1.9-1.9h-4.4
			c-1.1,0-1.9,0.9-1.9,1.9v3.5c0,0.6-0.3,1-0.8,1.2c-0.5,0.2-1.1,0.1-1.5-0.3l-2.5-2.5c-0.7-0.7-2-0.7-2.7,0L30.9,33
			c-0.4,0.4-0.6,0.8-0.6,1.4c0,0.5,0.2,1,0.6,1.4l2.5,2.5c0.4,0.4,0.5,0.9,0.3,1.5s-0.7,0.8-1.2,0.8H29c-1.1,0-1.9,0.9-1.9,1.9v4.4
			c0,1.1,0.9,1.9,1.9,1.9h3.5c0.6,0,1,0.3,1.2,0.8s0.1,1.1-0.3,1.5l-2.5,2.5c-0.4,0.4-0.6,0.8-0.6,1.4c0,0.5,0.2,1,0.6,1.4l3.1,3.1
			c0.7,0.7,2,0.7,2.7,0l2.5-2.5c0.4-0.4,0.9-0.5,1.5-0.3c0.5,0.2,0.8,0.7,0.8,1.2v3.5c0,1.1,0.9,1.9,1.9,1.9h4.4
			c1.1,0,1.9-0.9,1.9-1.9v-3.5c0-0.6,0.3-1,0.8-1.2c0.5-0.2,1.1-0.1,1.5,0.3l2.5,2.5c0.7,0.7,2,0.7,2.7,0l3.1-3.1
			c0.4-0.4,0.6-0.8,0.6-1.4c0-0.5-0.2-1-0.6-1.4L58,51c-0.4-0.4-0.5-0.9-0.3-1.5s0.7-0.8,1.2-0.8h3.5c1.1,0,1.9-0.9,1.9-1.9v-4.4
			C64.3,41.3,63.5,40.4,62.4,40.4z"/>
                </g>
                <path className="st0" d="M41.6,48.9h-5.3v-8.5h5.3 M36.6,44.5h4.2" />
                <path className="st0" d="M43.2,48.9v-8.5h2.4c0.5,0,1,0.1,1.4,0.2c0.4,0.1,0.7,0.3,1,0.5c0.3,0.2,0.4,0.5,0.6,0.7
		c0.1,0.3,0.2,0.6,0.2,1c0,0.3,0,0.6-0.1,0.8c-0.1,0.3-0.2,0.5-0.4,0.7c-0.2,0.2-0.4,0.4-0.7,0.5c-0.3,0.1-0.6,0.3-0.9,0.3
		c0.1,0.1,0.3,0.2,0.4,0.4l2.5,3.4"/>
                <path className="st0" d="M50.7,48.9v-8.5h2.5c0.5,0,1,0.1,1.4,0.2c0.4,0.1,0.7,0.3,1,0.5c0.3,0.2,0.5,0.5,0.6,0.8
		c0.1,0.3,0.2,0.7,0.2,1.1c0,0.4-0.1,0.8-0.2,1.1c-0.1,0.3-0.3,0.6-0.6,0.9c-0.3,0.2-0.6,0.4-1,0.6c-0.4,0.1-0.9,0.2-1.4,0.2h-1.4"
                />
                <circle className="st0" cx="78.5" cy="45.1" r="11.6" />
                <circle className="st0" cx="61.4" cy="77.3" r="11.6" />
                <circle className="st0" cx="28.1" cy="77.3" r="11.6" />
                <circle className="st0" cx="12.3" cy="44.9" r="11.6" />
                <circle className="st0" cx="28.8" cy="12.3" r="11.6" />
                <circle className="st0" cx="62.2" cy="12.3" r="11.6" />
                <line className="st0" x1="51.6" y1="56.8" x2="56.4" y2="66.9" />
                <line className="st0" x1="34.4" y1="22.4" x2="38.1" y2="30.8" />
                <line className="st0" x1="53.4" y1="30.8" x2="57.4" y2="23.1" />
                <line className="st0" x1="33.9" y1="67.2" x2="39.9" y2="56.4" />
                <line className="st0" x1="64.4" y1="44.9" x2="66.9" y2="44.9" />
                <line className="st0" x1="23.9" y1="44.9" x2="27" y2="44.9" />
            </g>
        </>,
        viewBox: "0 0 90.8 89.6",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 90.8, height: 89.6 },
    },
    FavoriteDoc: {
        image: <>
            <path className="st0" d="M51.5,67.9H7.8c-4,0-7.3-3.2-7.3-7.2v-53c0-4,3.3-7.2,7.3-7.2h37.4l13.6,14.3v45.8
	C58.8,64.7,55.5,67.9,51.5,67.9z"/>
            <g>
                <g>
                    <path className="st1" d="M58.8,31.8V14.4c0-0.4-0.2-0.7-0.4-1L46.1,1.2c-0.3-0.3-0.6-0.4-1-0.4H7.7c-3.8,0-7,3.1-7,7v53.2
			c0,3.8,3.1,7,7,7h7 M43.7,0.8v8.1c0,1.9,0.7,3.6,2,4.9c1.3,1.3,2.8,2,4.9,2h8.1"/>
                </g>
            </g>
            <polygon className="st2" points="38.4,25 44.9,38.1 59.3,40.2 48.9,50.4 51.3,64.8 38.4,56.3 25.4,64.8 27.9,50.4 17.4,40.2 31.9,38.1 
	"/>
        </>,
        viewBox: "0 0 59.5 68.6",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 59.5, height: 68.6 },
    },
    Female: {
        image: <>
            <g>
                <circle className="st0" cx="16.4" cy="7.3" r="6.5" />
                <path className="st0" d="M31.4,44.9l-6.6-23c-0.1-0.5-0.2-0.9-0.4-1.3l0,0l0,0c-1.3-3.3-4.5-5.7-8.2-5.7S9.2,17.2,8,20.6l0,0l0,0
		c-0.2,0.4-0.3,0.9-0.4,1.3L1,44.9h9.2h1.1v10.8c0,2.6,2.2,4.8,4.8,4.8s4.8-2.2,4.8-4.8V44.9H31.4z"/>
            </g>
        </>,
        viewBox: "0 0 32.4 61.3",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 32.4, height: 63.1 },
    },
    GlobalTeam: {
        image: <>
            <g>
                <ellipse className="st0" cx="42.8" cy="43.7" rx="20.7" ry="20.7" />
                <g>
                    <path className="st1" d="M0.8,30.2c0-5.4,4.4-9.7,9.7-9.7s9.7,4.4,9.7,9.7 M11,19.6c-2.9,0-5.3-2.4-5.3-5.3S8,8.9,11,8.9
			s5.3,2.4,5.3,5.3S13.9,19.6,11,19.6z"/>
                </g>
                <g>
                    <path className="st1" d="M64.7,30.2c0-5.4,4.4-9.7,9.7-9.7c5.4,0,9.7,4.4,9.7,9.7 M74.9,19.6c-2.9,0-5.3-2.4-5.3-5.3s2.4-5.3,5.3-5.3
			s5.3,2.4,5.3,5.3S77.8,19.6,74.9,19.6z"/>
                </g>
                <g>
                    <path className="st1" d="M0.8,76.5c0-5.4,4.4-9.7,9.7-9.7s9.7,4.4,9.7,9.7 M11,65.9c-2.9,0-5.3-2.4-5.3-5.3c0-2.9,2.4-5.3,5.3-5.3
			s5.3,2.4,5.3,5.3C16.3,63.5,13.9,65.9,11,65.9z"/>
                </g>
                <g>
                    <path className="st1" d="M64.7,76.5c0-5.4,4.4-9.7,9.7-9.7c5.4,0,9.7,4.4,9.7,9.7 M74.9,65.9c-2.9,0-5.3-2.4-5.3-5.3
			c0-2.9,2.4-5.3,5.3-5.3s5.3,2.4,5.3,5.3C80.2,63.5,77.8,65.9,74.9,65.9z"/>
                </g>
                <path className="st2" d="M84.7,50.7c0.8-4.7,0.8-9.5,0-14.3" />
                <path className="st2" d="M62.1,5.5c-12.3-6.3-26.9-6.3-39.2,0" />
                <path className="st3" d="M25.4,82.7c10.9,4.8,23.3,4.8,34.2,0h0" />
                <path className="st2" d="M55.6,59.3l-1.1-2l3-7.1c0.3-0.8,0.1-1.6-0.6-2.1l-2.4-1.6l0.1-8.5l2.6-3.3l3.7-0.6
		C65.1,42.8,63,53.2,55.6,59.3z M52.8,61.3c-5.7,3.3-12.5,3.7-18.5,1c-6-2.6-10.4-7.9-11.8-14.3 M27.4,29.6c4.1-4.5,10-6.9,16.1-6.6
		c6.1,0.3,11.7,3.3,15.4,8.1 M25.3,32.4l5,3.3c0.3,0.2,0.6,0.3,0.9,0.3l9,0.1l2.7,4.6l-5.2,3l-3,6.6l-5.2-5.4
		c-0.3-0.4-0.9-0.7-1.4-0.6l-6,0.4C21.8,40.3,23,36,25.3,32.4z"/>
            </g>
        </>,
        viewBox: "0 0 86.1 87.1",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 86.1, height: 87.1 },
    },
    GlobeLocations: {
        image: <>
            <g>
                <circle className="st0" cx="29" cy="33.7" r="27.2" />
                <path className="st1" d="M35.9,3c-1.5-1.5-3.4-2.3-5.5-2.3c-2.1,0-4,0.8-5.5,2.3c-2.7,2.7-3.1,7.8-0.7,10.9l6.2,9l6.2-9
		C38.9,10.9,38.6,5.7,35.9,3z"/>
                <path className="st1" d="M14,19.2c-1.5-1.5-3.4-2.3-5.5-2.3c-2.1,0-4,0.8-5.5,2.3C0.3,21.9,0,27,2.3,30.1l6.2,9l6.2-9
		C17.1,27,16.7,21.9,14,19.2z"/>
                <g>
                    <path className="st2" d="M56.3,30.6c1.2,9.3-2.5,18.9-10.2,25 M39.6,8.8C45,11,49.8,14.9,52.9,20.4c1.2,2.1,2.1,4.4,2.7,6.6l-2.6-0.7
			l0.5,3.7l-3,0.5l-1.4,6.2c0,0-1.6-1.9-2.1-3s-4.6-3.4-4.6-3.4s-1.9,1.1-2.9,1s-0.8-2.4-0.8-2.4 M26.2,17.7c-1.8,0-4.8,1.3-5.7,2.8
			l-1.7-2.4l1.7-4.1 M5,37.2l4.8,3.6c0.1,0.1,0.3,0.2,0.5,0.2l2.9,0.6c0.4,0.1,0.7,0.3,0.9,0.6c0.2,0.3,0.2,0.7,0.1,1.1
			c-0.2,0.7-0.2,1.5,0,2.2l0.4,1.1c0.2,0.7-0.2,1.4-0.8,1.6l-1.2,0.4c-0.4,0.1-0.7,0.5-0.8,0.9l-0.9,4.8c-2-1.9-3.8-4.1-5.3-6.6
			c-1.8-3.1-2.9-6.3-3.4-9.7L5,37.2z M7.1,16.7c3.8-4.6,8.9-7.9,14.9-9.3 M37.4,28.6c-0.1,0.1,1.5,4.2,1.4,4.3
			c-0.5,0.6-1.6,0-1.9,1.1c-0.1,0.3-1.8-2-2.1-1.8c-0.2,0.2,2,3.1,1.8,3.5c-0.3,0.5-0.2,4.6-1.1,9.8c-0.1,0.3-1.8,5.5-2,5.7
			c-0.3,0.4-0.9,0.9-1.5,1.3c-0.5,0.3-0.9,0.4-1,0.4c-0.1-0.1-0.6-0.7-1.2-2.7c-0.2-0.5-0.4-1-0.6-1.5c-0.5-1.1-1-2.2-0.8-3
			c0-0.1,0.1-0.2,0.1-0.3c0.4-1.2,0.8-2.4,0.1-4c-0.2-0.5-0.5-0.9-0.8-1.2c-0.2-0.2-0.4-0.5-0.4-0.6c0-0.2,0-0.4,0-0.6
			c0-0.6,0-1.5-0.9-2.4c-1.3-1.2-2.8-0.8-3.8-0.6c-0.3,0.1-0.6,0.1-0.8,0.2c-1.6,0.2-3.1-0.4-4-1.7c-0.9-1.3-1.1-3.1-0.4-4.6
			c0.4-0.7,0.9-1.3,1.5-2c0.1-0.2,0.3-0.3,0.4-0.5c0.2-0.3,0.5-0.6,0.7-1c0.3-0.4,0.9-1.3,1.2-1.4c0.5-0.3,1.7-0.3,2.6-0.4
			c0.4,0,0.7,0,1,0c0.2,0,0.3,0,0.5,0c-0.1,0.2-0.1,0.4-0.1,0.6c0.1,0.4,0.3,0.7,0.6,0.8c0.2,0.1,0.5,0.3,0.8,0.5
			c0.9,0.6,1.9,1.3,2.9,1.4c0.9,0.1,1.4-0.4,1.6-0.7c0,0,0,0,0,0c0.1-0.1,0.2-0.2,0.3-0.4c0.2,0.1,0.4,0.1,0.6,0.2"/>
                </g>
                <path className="st2" d="M8.6,21.7c-1.6,0-2.8,1.3-2.8,2.8c0,1.6,1.3,2.8,2.8,2.8s2.8-1.3,2.8-2.8C11.4,23,10.2,21.7,8.6,21.7z" />
                <path className="st3" d="M30.5,5.6c-1.6,0-2.8,1.3-2.8,2.8s1.3,2.8,2.8,2.8c1.6,0,2.8-1.3,2.8-2.8S32,5.6,30.5,5.6z" />
            </g>
        </>,
        viewBox: "0 0 57.3 60.9",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 57.3, height: 60.9 },
    },
    HandShake: {
        image: <>
            <g>
                <g>
                    <path className="st0" d="M58.2,19.3c0-10.2-8.3-18.5-18.5-18.5c-4.2,0-8.1,1.4-11.4,3.9c-0.8,0.6-1.5,1.2-2.1,1.9
			c-1,1-1.8,2.2-2.5,3.4c-1.6,2.8-2.4,6-2.4,9.2"/>
                    <path className="st0" d="M33.3,22.9c0,3,1.8,5.6,4.3,6.3c0.1,0.9,0.8,1.6,1.7,1.6c1,0,1.7-0.8,1.7-1.7c2.5-0.7,4.7-2.5,4.7-5.8
			c0-3.9-4-6.1-6.1-6.1"/>
                    <path className="st0" d="M45,14.6c0-1.1,0-2.4-1.3-3.7c-0.8-0.8-1.7-1.3-2.6-1.6c-0.1-0.9-0.8-1.6-1.7-1.6c-1,0-1.8,0.8-1.8,1.8v0.1
			c-1.9,0.7-4,2.4-4,5.7c0,4,4.2,5.4,6.1,5.4"/>
                </g>
                <path className="st1" d="M26.2,57.7l1,1c0.3,0.3,0.9,0.3,1.2,0l9.9-9.8l0.3-0.4c0.3-0.3,0.3-0.9,0-1.2L28,36.7l-11.1-1.1" />
                <path className="st1" d="M26.5,35.3c-1.3-1.3-3.7-1.5-5-0.2h-7.9V48l2.8,0.5" />
                <path className="st1" d="M22.5,45.1c-0.8-0.8-2.1-0.8-2.8,0l-3.8,3.8L15.7,50l10.1,10.3c0.3,0.3,0.9,0.3,1.2,0l3.8-3.8
		c0.8-0.8,0.8-2.1,0-2.8l-8.1-8.1L22.5,45.1z"/>
                <path className="st1" d="M44.1,35.1h-8.7l-0.5-0.5c-0.2-0.2-0.4-0.3-0.5-0.4l0,0l-0.7-0.7c-1.5-1.5-4-1.5-5.5,0l-6.9,6.9
		c-0.5,0.5-0.5,1.3,0,1.8c1.4,1.4,3.6,1.4,4.9,0l3.5-3.5l9.4,9.4H44"/>
                <path className="st1" d="M55.6,51.6H45c-0.5,0-0.9-0.4-0.9-0.9V33.3c0-0.5,0.4-0.9,0.9-0.9h14.8" />
                <path className="st1" d="M1.9,51.6h11c0.4,0,0.6-0.4,0.6-0.9V33.3c0-0.5-0.3-0.9-0.6-0.9H0" />
            </g>
        </>,
        viewBox: "0 0 59.8 61.3",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 59.8, height: 61.3 },
    },
    Heart: {
        image: <>
            <path className="st0" d="M31.8,56c-0.9,0-1.7-0.3-2.4-0.9c-2.5-2.2-4.9-4.3-7.1-6.1l0,0c-6.3-5.3-11.7-9.9-15.4-14.5
	c-4.2-5.1-6.2-9.9-6.2-15.1c0-5.1,1.8-9.8,4.9-13.3c3.2-3.5,7.6-5.4,12.4-5.4c3.6,0,6.9,1.1,9.8,3.4c1.5,1.1,2.8,2.5,3.9,4.1
	c1.2-1.6,2.5-3,3.9-4.1c2.9-2.2,6.2-3.4,9.8-3.4c4.8,0,9.2,1.9,12.4,5.4c3.2,3.4,4.9,8.2,4.9,13.3c0,5.3-2,10.1-6.2,15.1
	c-3.8,4.5-9.2,9.1-15.4,14.5c-2.1,1.8-4.6,3.9-7.1,6.1C33.5,55.7,32.7,56,31.8,56z"/>
        </>,
        viewBox: "0 0 63.6 56.8",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 63.6, height: 56.8 },
    },
    LineGraph: {
        image: <>
            <g>
                <g>
                    <line className="st0" x1="0.8" y1="60.3" x2="0.8" y2="0.8" />
                </g>
            </g>
            <polyline className="st1" points="70.1,12.2 52.8,39.7 43.5,36.8 27.1,48.7 14,29.4 0.8,60.3 0.8,76.3 69.9,76.3 " />
            <polyline className="st0" points="71.1,23.7 70.5,11.9 59,16.3 " />
        </>,
        viewBox: "0 0 71.9 77.1",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 71.9, height: 77.1 },
    },
    Link: {
        image: <>
            <g>
                <path className="st0" d="M0.8,32.1V12.7c0-6.6,5.4-11.9,11.9-11.9h0c6.6,0,11.9,5.4,11.9,11.9v19.4c0,6.6-5.4,11.9-11.9,11.9h0" />
                <path className="st0" d="M24.6,43.3v19.4c0,6.6-5.4,11.9-11.9,11.9h0c-6.6,0-11.9-5.4-11.9-11.9V43.3c0-6.6,5.4-11.9,11.9-11.9h0" />
            </g>
        </>,
        viewBox: "0 0 25.4 75.4",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 25.4, height: 75.4 },
    },
    LocationPin: {
        image: <>
            <g>
                <path className="st0" d="M38.7,7.3C34.5,3.1,28.9,0.8,23,0.8c-5.9,0-11.5,2.3-15.7,6.5C-0.5,15-1.5,29.7,5.2,38.5L23,64.3l17.8-25.7
		C47.5,29.7,46.5,15,38.7,7.3z"/>
                <path className="st1" d="M23.2,14.7c-4.5,0-8.1,3.6-8.1,8.1s3.6,8.1,8.1,8.1s8.1-3.6,8.1-8.1S27.7,14.7,23.2,14.7z" />
            </g>
        </>,
        viewBox: "0 0 46 65.6",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 46, height: 65.6 },
    },
    MailBox: {
        image: <>
            <g>
                <polygon className="st0" points="23.2,6.8 2.6,16.6 9.1,20 1.3,27.3 9.8,31.5 10,48.4 32.5,59.9 56.8,48 56.7,29.1 62.9,25.7 
		54.3,19.1 62.8,12.4 39.6,0.9 37.9,2.9 33.5,1.6 31.5,3.8 27.1,2.5 	"/>
                <g>
                    <path className="st1" d="M14,23L25.7,3.4c0.7-1.2,2.2-1.6,3.4-0.9l14.5,8.7c1.2,0.7,1.6,2.2,0.9,3.4l-9.1,15.1" />
                    <path className="st1" d="M27.9,2.2L31,19.4c0.1,0.7,0,1.4-0.4,2c-0.4,0.6-0.9,1.1-1.6,1.3l-8.5,2.8" />
                </g>
                <g>
                    <path className="st1" d="M31.3,3.9l0.6-1.1c0.7-1.2,2.2-1.6,3.4-0.9l14.5,8.7c1.2,0.7,1.6,2.2,0.9,3.4L44.3,25" />
                    <path className="st1" d="M34.1,1.7l0.8,4" />
                </g>
                <polyline className="st1" points="9.8,31.5 9.8,48.7 32.4,60.2 56.8,48 56.8,29.3 	" />
                <polyline className="st1" points="18.6,15.5 9.1,20 2.5,16.3 24.2,5.9 	" />
                <polyline className="st1" points="32.4,60.2 32.4,32.1 25,39.1 1.3,27.3 9.1,20.2 32.5,31.5 54.6,19.8 49.1,16.6 	" />
                <polyline className="st1" points="62.9,25.7 40,38.4 32.1,31.7 	" />
                <polyline className="st1" points="63.5,25.8 54.3,19.1 62.8,12.4 39.6,0.9 37.5,3.2 39.6,0.9 	" />
            </g>
        </>,
        viewBox: "0 0 64.2 61",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 64.2, height: 61 },
    },
    Mail: {
        image: <>
            <g>
                <polygon className="st0" points="23.2,6.8 2.6,16.6 9.1,20 1.3,27.3 9.8,31.5 10,48.4 32.5,59.9 56.8,48 56.7,29.1 62.9,25.7 
		54.3,19.1 62.8,12.4 39.6,0.9 37.9,2.9 33.5,1.6 31.5,3.8 27.1,2.5 	"/>
                <g>
                    <path className="st1" d="M14,23L25.7,3.4c0.7-1.2,2.2-1.6,3.4-0.9l14.5,8.7c1.2,0.7,1.6,2.2,0.9,3.4l-9.1,15.1" />
                    <path className="st1" d="M27.9,2.2L31,19.4c0.1,0.7,0,1.4-0.4,2c-0.4,0.6-0.9,1.1-1.6,1.3l-8.5,2.8" />
                </g>
                <g>
                    <path className="st1" d="M31.3,3.9l0.6-1.1c0.7-1.2,2.2-1.6,3.4-0.9l14.5,8.7c1.2,0.7,1.6,2.2,0.9,3.4L44.3,25" />
                    <path className="st1" d="M34.1,1.7l0.8,4" />
                </g>
                <polyline className="st1" points="9.8,31.5 9.8,48.7 32.4,60.2 56.8,48 56.8,29.3 	" />
                <polyline className="st1" points="18.6,15.5 9.1,20 2.5,16.3 24.2,5.9 	" />
                <polyline className="st1" points="32.4,60.2 32.4,32.1 25,39.1 1.3,27.3 9.1,20.2 32.5,31.5 54.6,19.8 49.1,16.6 	" />
                <polyline className="st1" points="62.9,25.7 40,38.4 32.1,31.7 	" />
                <polyline className="st1" points="63.5,25.8 54.3,19.1 62.8,12.4 39.6,0.9 37.5,3.2 39.6,0.9 	" />
            </g>
        </>,
        viewBox: "0 0 18.8 62.1",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 18.8, height: 62.1 },
    },
    Minus: {
        image: <>
            <g>
                <circle className="st0" cx="33.5" cy="33.5" r="32.7" />
                <g>
                    <line className="st1" x1="19.7" y1="33.5" x2="47.3" y2="33.5" />
                </g>
            </g>
        </>,
        viewBox: "0 0 67 67",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 67, height: 67 },
    },
    Net: {
        image: <>
            <polyline className="st0" points="0.8,0.8 65.8,0.8 65.8,65.2 " />
            <line className="st0" x1="65.4" y1="1.4" x2="6.3" y2="33" />
            <line className="st0" x1="29.3" y1="58.6" x2="65.6" y2="1" />
            <path className="st0" d="M65.6,32c-17,0-30.8-13.8-30.8-30.8" />
            <path className="st0" d="M65.2,55.4c-29.9,0-54.1-24.2-54.1-54.1" />
        </>,
        viewBox: "0 0 66.6 66",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 66.6, height: 66 },
    },
    NewsPaper: {
        image: <>
            <path className="st0" d="M83.3,48.2c0,0-3.8-3.5-0.9-8.3l3.8-4.7c0.4-0.3,0.7-0.7,0.7-1.2c0-0.5-0.3-0.9-0.7-1.2L35.6,1
	c-0.5-0.3-1.1-0.3-1.5,0L7.5,17.7C3.7,20.1,0.8,25.5,0.8,30v0.8c0,4.5,3,9.8,6.7,12.2l39.6,24.9c0,0,2.8,0.9,5.6-0.4
	c2.8-1.3,5-3.5,5-3.5"/>
            <g>
                <path className="st1" d="M83,44.8c0.5-0.3,0.8-0.3,0.8-0.3c0,0,0.2,0.2,0.2,0.8c0,1.6-1.2,3.7-2.5,4.6L58.4,64.5
		c-1.2,0.8-2.4,1-3.1,0.6c-0.7-0.4-1.1-1.5-1.1-2.9c0-3.7,2.6-8.4,5.7-10.4l26.3-16.6c0.4-0.3,0.7-0.7,0.7-1.2
		c0-0.5-0.3-0.9-0.7-1.2L35.6,1c-0.5-0.3-1.1-0.3-1.5,0L7.5,17.7C3.7,20.1,0.8,25.5,0.8,30v0.8c0,4.5,3,9.8,6.7,12.2l39.6,24.9"/>
                <path className="st1" d="M73.2,33.8L36.7,10.5" />
                <path className="st1" d="M41.6,34l14,8.7c0.2,0.1,0.5,0.2,0.8,0.2" />
                <path className="st1" d="M44.2,25.7c0-0.5-0.3-0.9-0.7-1.2l-13.9-8.7c-0.5-0.3-1-0.3-1.5,0l-11.8,7.4c-0.4,0.3-0.7,0.7-0.7,1.2
		c0,0.5,0.3,0.9,0.7,1.2l14.1,8.7c0.2,0.1,0.5,0.2,0.7,0.2c0.3,0,0.5-0.1,0.8-0.2"/>
                <path className="st1" d="M10.8,33.6l34.7,21.6" />
                <path className="st1" d="M50.7,29.2l14,8.7" />
            </g>
        </>,
        viewBox: "0 0 87.6 68.5",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 87.6, height: 68.5 },
    },
    People: {
        image: <>
            <g>
                <g>
                    <circle className="st0" cx="31.6" cy="7.8" r="5.5" />
                    <path className="st0" d="M31.6,14.4L31.6,14.4c-4,0-7.3,3.3-7.3,7.3V34c0,2.5,1.3,4.7,3.2,6v9c0,2.3,1.8,4.1,4.1,4.1h0
			c2.3,0,4.1-1.8,4.1-4.1v-9c1.9-1.3,3.2-3.5,3.2-6V21.7C38.9,17.7,35.7,14.4,31.6,14.4z"/>
                </g>
                <g>
                    <circle className="st0" cx="20.6" cy="10.9" r="5.3" />
                    <line className="st0" x1="13.8" y1="21.8" x2="13.8" y2="21.9" />
                    <path className="st0" d="M14.8,41.8h1.7v8.9c0,2.2,1.8,3.9,3.9,3.9s3.9-1.8,3.9-3.9v-8.9h8.5L27.5,23c-0.1-0.4-0.2-0.7-0.3-1.1l0,0
			l0,0c-1-2.7-3.7-4.6-6.7-4.6c-2.3,0-4.3,1.1-5.6,2.7"/>
                </g>
                <g>
                    <circle className="st0" cx="40.3" cy="8.3" r="5.7" />
                    <path className="st0" d="M47.6,21.1c-0.8-3.4-3.8-5.9-7.3-5.9h0c-4.1,0-7.5,3.4-7.5,7.5v12.7c0,2.6,1.3,4.9,3.3,6.2V51
			c0,2.3,1.9,4.2,4.2,4.2h0c2.3,0,4.2-1.9,4.2-4.2v-7"/>
                </g>
                <g>
                    <circle className="st0" cx="55.8" cy="6.6" r="5.9" />
                    <path className="st0" d="M64.5,23.7l-1.1-3.9c-0.1-0.4-0.2-0.8-0.3-1.2l0,0l0,0c-1.1-3-4-5.1-7.4-5.1s-6.3,2.1-7.4,5.1l0,0l0,0
			c-0.1,0.4-0.3,0.8-0.3,1.2L42,40.5h8.3h1v9.8c0,2.4,2,4.3,4.3,4.3s4.3-2,4.3-4.3v-9.8h4.8"/>
                </g>
                <g>
                    <circle className="st0" cx="72.3" cy="9" r="5.9" />
                    <path className="st0" d="M72.3,16.1L72.3,16.1c-4.3,0-7.7,3.5-7.7,7.7v13.1c0,2.6,1.3,5,3.4,6.4v9.6c0,2.4,2,4.3,4.3,4.3h0
			c2.4,0,4.3-2,4.3-4.3v-9.6c2-1.4,3.4-3.7,3.4-6.4V23.8C80,19.6,76.6,16.1,72.3,16.1z"/>
                </g>
                <g>
                    <circle className="st0" cx="8.5" cy="9" r="5.9" />
                    <path className="st0" d="M8.5,16.1L8.5,16.1c-4.3,0-7.7,3.5-7.7,7.7v13.1c0,2.6,1.3,5,3.4,6.4v9.6c0,2.4,2,4.3,4.3,4.3h0
			c2.4,0,4.3-2,4.3-4.3v-9.6c2-1.4,3.4-3.7,3.4-6.4V23.8C16.2,19.6,12.7,16.1,8.5,16.1z"/>
                </g>
            </g>
        </>,
        viewBox: "0 0 80.8 58",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 80.8, height: 58 },
    },
    Plus: {
        image: <>
            <circle className="st0" cx="33.9" cy="33.9" r="33.2" />
            <g>
                <line className="st1" x1="20" y1="33.9" x2="47.9" y2="33.9" />
                <line className="st1" x1="33.9" y1="20" x2="33.9" y2="47.9" />
            </g>
        </>,
        viewBox: "0 0 67.8 67.8",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 67.8, height: 67.8 },
    },
    Printer: {
        image: <>
            <g>
                <path className="st0" d="M70.4,25.9V15.4c0-2.2-0.5-3.9-2.2-5.5l-7-7C59.8,1.5,58,0.8,56,0.8H18.1c-1.4,0-2.5,1.1-2.5,2.5v22.5" />
                <path className="st1" d="M5.7,25.9c-2.9,1-5,3.8-5,7V58c0,4.1,3.3,7.4,7.4,7.4h7.4v17.3c0,1.4,1.1,2.5,2.5,2.5h49.9
		c1.4,0,2.5-1.1,2.5-2.5V65.5h7.4c4.1,0,7.4-3.3,7.4-7.4V32.9c0-3.2-2.1-6-5-7"/>
                <polyline className="st1" points="69.9,12.3 57.8,12.3 57.8,0.9 	" />
                <path className="st1" d="M70.4,60.5v-5h2.5c1.4,0,2.5-1.1,2.5-2.5s-1.1-2.5-2.5-2.5H13.1c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5h2.5v5
		"/>
                <line className="st1" x1="5.9" y1="26" x2="80.5" y2="26" />
                <g>
                    <g>
                        <path className="st1" d="M23,35.4h-9.9c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5H23c1.4,0,2.5-1.1,2.5-2.5S24.4,35.4,23,35.4z" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st1" d="M28,65.5h30" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st1" d="M28,75.4h30" />
                    </g>
                </g>
            </g>
        </>,
        viewBox: "0 0 86 86",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 86, height: 86 },
    },
    Profiles: {
        image: <>
            <g>
                <g>
                    <g>
                        <path className="st0" d="M15.6,67.9v5.4c0,1,0.8,1.9,1.9,1.9h63.2c1,0,1.9-0.8,1.9-1.9V17.5c0-1-0.8-1.9-1.9-1.9h-5.1" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st0" d="M8.2,60.6v5.3c0,1,0.8,1.9,1.9,1.9h63.2c1,0,1.9-0.8,1.9-1.9V10.1c0-1-0.8-1.9-1.9-1.9h-5.6" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st0" d="M65.9,0.8H2.6c-1,0-1.9,0.8-1.9,1.9v55.8c0,1,0.8,1.9,1.9,1.9h63.2c1,0,1.9-0.8,1.9-1.9V2.6
				C67.7,1.6,66.9,0.8,65.9,0.8z"/>
                    </g>
                </g>
                <g>
                    <g>
                        <g>
                            <path className="st0" d="M20,26.9c-3.1,0-5.6-2.5-5.6-5.6c0-3.1,2.5-5.6,5.6-5.6s5.6,2.5,5.6,5.6C25.6,24.4,23.1,26.9,20,26.9z" />
                        </g>
                    </g>
                    <path className="st0" d="M8.6,45.4c0-10.2,5.1-18.5,11.4-18.5s11.4,8.3,11.4,18.5" />
                </g>
                <line className="st0" x1="36.1" y1="20.8" x2="60.5" y2="20.8" />
                <line className="st0" x1="36.1" y1="26.9" x2="60.5" y2="26.9" />
                <line className="st0" x1="36.1" y1="33" x2="53.4" y2="33" />
                <line className="st0" x1="36.1" y1="39.1" x2="60.5" y2="39.1" />
            </g>
        </>,
        viewBox: "0 0 83.3 75.9",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 83.3, height: 75.9 },
    },
    Question: {
        image: <>
            <circle className="st0" cx="33.4" cy="33.4" r="32.7" />
            <line className="st1" x1="33.5" y1="41.2" x2="33.5" y2="44.9" />
            <path className="st1" d="M26.5,22.3c0.4-0.4,0.8-0.7,1.2-1.1c0.5-0.3,1-0.6,1.5-0.9c0.6-0.3,1.2-0.5,1.8-0.6s1.4-0.2,2.1-0.2
	c1,0,1.8,0.1,2.7,0.4c0.8,0.3,1.6,0.7,2.2,1.2c0.6,0.5,1.1,1.2,1.5,1.9s0.6,1.6,0.6,2.6c0,1-0.2,1.9-0.5,2.7c-0.3,0.7-0.7,1.4-1.2,2
	c-0.5,0.6-1,1.1-1.6,1.5c-0.6,0.4-1.1,0.8-1.6,1.2c-0.5,0.4-0.9,0.8-1.3,1.1c-0.3,0.4-0.5,0.8-0.6,1.3v3.8"/>
        </>,
        viewBox: "0 0 66.8 66.8",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 66.8, height: 66.8 },
    },
    SalesManager: {
        image: <>
            <g>
                <path className="st0" d="M0.8,56.5V34c-0.2-3.3,0.7-5,3.8-6.2l8.9-3.3l0.1-1.7v-3l11.9-0.9v2l0.2,2.8l10.1,3.9c0,0,2.4,0.7,2.4,5.4
		s0,15.4,0,15.4"/>
                <path className="st0" d="M11.5,25.5l3.7,5.9c0.2,0.2,8.2,0.5,8.3,0.2l4.2-6.6" />
                <path className="st0" d="M27.8,11.9c0,5.5-3.7,10.1-8.7,10.1c-5,0-8.7-4.6-8.7-10.1s1.8-11.1,8.9-11.1C27.2,0.8,27.8,6.3,27.8,11.9z" />
                <path className="st0" d="M10.6,10.4c3-0.5,4.7-3.8,4.7-3.8s2,4.1,4.6,3.1c7-2.5,7.1,2.2,7.1,2.2" />
                <path className="st0" d="M16.4,18h5.8" />
                <path className="st0" d="M53.4,46.4v13.4c0,1.3-1.1,2.4-2.4,2.4H23.8c-1.3,0-2.4-1.1-2.4-2.4V46.4 M25.2,48.9c-3.2-1.5-5-3.4-5-5.4
		v-3.4c0-1.4,1.2-2.6,2.6-2.6h29.4c1.4,0,2.6,1.2,2.6,2.6v3.4c0,2-1.8,3.9-5,5.4 M42.8,50.6l-10.3,0.2 M32.4,37.4v-2.6
		c0-0.7,0.6-1.3,1.3-1.3h7.4c0.7,0,1.3,0.6,1.3,1.3v2.6H32.4z M47.3,49.8v2.6c0,0.7-0.6,1.3-1.3,1.3c-0.7,0-1.3-0.6-1.3-1.3v-2.6
		H47.3z M27.5,52.3v-2.6h2.6v2.6c0,0.7-0.6,1.3-1.3,1.3C28.1,53.7,27.5,53.1,27.5,52.3z"/>
            </g>
        </>,
        viewBox: "0 0 55.4 62.9",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 55.4, height: 62.9 },
    },
    Seller: {
        image: <>
            <g>
                <path className="st0" d="M68.3,65.3H1.1c-0.2,0-0.4-0.2-0.4-0.4v-5.4c0-0.2,0.2-0.4,0.4-0.4h67.1c0.2,0,0.4,0.2,0.4,0.4v5.4
		C68.6,65.2,68.5,65.3,68.3,65.3z"/>
                <g>
                    <path className="st0" d="M13.4,58.1H3.3c-0.2,0-0.4-0.2-0.4-0.4V44.5c0-0.2,0.2-0.4,0.4-0.4h10.1c0.2,0,0.4,0.2,0.4,0.4v13.3
			C13.8,58,13.6,58.1,13.4,58.1z"/>
                    <path className="st0" d="M26.8,58.1H16.6c-0.2,0-0.4-0.2-0.4-0.4V44.5c0-0.2,0.2-0.4,0.4-0.4h10.1c0.2,0,0.4,0.2,0.4,0.4v13.3
			C27.2,58,27,58.1,26.8,58.1z"/>
                    <path className="st0" d="M40.1,58.1H30c-0.2,0-0.4-0.2-0.4-0.4V44.5c0-0.2,0.2-0.4,0.4-0.4h10.1c0.2,0,0.4,0.2,0.4,0.4v13.3
			C40.5,58,40.3,58.1,40.1,58.1z"/>
                    <path className="st0" d="M53.4,58.1H43.3c-0.2,0-0.4-0.2-0.4-0.4V44.5c0-0.2,0.2-0.4,0.4-0.4h10.1c0.2,0,0.4,0.2,0.4,0.4v13.3
			C53.8,58,53.7,58.1,53.4,58.1z"/>
                    <path className="st0" d="M66.8,58.1H56.6c-0.2,0-0.4-0.2-0.4-0.4V44.5c0-0.2,0.2-0.4,0.4-0.4h10.1c0.2,0,0.4,0.2,0.4,0.4v13.3
			C67.2,58,67,58.1,66.8,58.1z"/>
                </g>
                <g>
                    <path className="st0" d="M49.6,40.4L47.7,34l0-2.5h11.9c2.6,0,4.7-2,4.7-4.5v0c0-2.5-2.1-4.5-4.7-4.5H47.2H44H10.4
			c-2.6,0-4.7,2-4.7,4.5v0c0,2.5,2.1,4.5,4.7,4.5h12.9l-0.1,1.8l-2.4,7.2"/>
                    <g>
                        <g>
                            <g>
                                <ellipse className="st0" cx="35.6" cy="10.7" rx="8.8" ry="9.9" />
                            </g>
                        </g>
                    </g>
                    <polyline className="st0" points="34.4,26 32.1,43 35.6,46.8 39.1,43.4 37.2,26 		" />
                </g>
            </g>
        </>,
        viewBox: "0 0 69.4 66.1",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 69.4, height: 66.1 },
    },
    SellerMan: {
        image: <>
            <g>
                <path className="st0" d="M21.9,59.6h-7.1c-0.2,0-0.4-0.2-0.4-0.4V41c0-0.2,0.2-0.4,0.4-0.4h7.1c0.2,0,0.4,0.2,0.4,0.4v18.2
		C22.3,59.4,22.1,59.6,21.9,59.6z"/>
                <path className="st0" d="M8.1,59.6H1.1c-0.2,0-0.4-0.2-0.4-0.4V49.1c0-0.2,0.2-0.4,0.4-0.4h6.9c0.2,0,0.4,0.2,0.4,0.4v10.1
		C8.4,59.4,8.3,59.6,8.1,59.6z"/>
                <path className="st0" d="M8.1,43.1H1.1c-0.2,0-0.4-0.2-0.4-0.4v-9.1c0-0.2,0.2-0.4,0.4-0.4h6.9c0.2,0,0.4,0.2,0.4,0.4v9.1
		C8.4,42.9,8.3,43.1,8.1,43.1z"/>
                <path className="st0" d="M59.9,59.6h-6.6c-0.2,0-0.4-0.2-0.4-0.4V49.1c0-0.2,0.2-0.4,0.4-0.4h6.6c0.2,0,0.4,0.2,0.4,0.4v10.1
		C60.3,59.4,60.1,59.6,59.9,59.6z"/>
                <path className="st0" d="M59.9,43.7h-6.6c-0.2,0-0.4-0.2-0.4-0.4v-9.1c0-0.2,0.2-0.4,0.4-0.4h6.6c0.2,0,0.4,0.2,0.4,0.4v9.1
		C60.3,43.5,60.1,43.7,59.9,43.7z"/>
                <path className="st0" d="M46.6,59.6h-5.7c-0.2,0-0.4-0.2-0.4-0.4v-8.4c0-0.2,0.2-0.4,0.4-0.4h5.7c0.2,0,0.4,0.2,0.4,0.4v8.4
		C47,59.4,46.8,59.6,46.6,59.6z"/>
                <path className="st0" d="M43.8,45.3L43.8,45.3c-1.8,0-3.3-1.5-3.3-3.3v-2.7c0-1.8,1.5-3.3,3.3-3.3h0c1.8,0,3.3,1.5,3.3,3.3v2.7
		C47,43.9,45.6,45.3,43.8,45.3z"/>
                <path className="st0" d="M35.1,59.6h-6.9c-0.2,0-0.4-0.2-0.4-0.4v-20c0-0.2,0.2-0.4,0.4-0.4h6.9c0.2,0,0.4,0.2,0.4,0.4v20
		C35.5,59.4,35.3,59.6,35.1,59.6z"/>
                <ellipse className="st0" cx="29.6" cy="7.5" rx="5.7" ry="6.7" />
                <path className="st0" d="M15.1,30.7L7.6,19l0-0.6c0,0-3.9,0.3-5.4,0s-1.3-6.2-1.3-6.2s6.4,0,7.8,0s3.5,4.1,3.5,4.1l5.5,7.4l0.2-0.5
		c0-3.7,3-6.7,6.7-6.7H34c4,0,7.2,3.2,7.2,7.2l0,0.6l6.3-8.1c0,0,2.1-4.1,3.5-4.1s7.8,0,7.8,0s0.2,5.9-1.3,6.2s-5.4,0-5.4,0l0,0.6
		l-7.5,11.7"/>
            </g>
        </>,
        viewBox: "0 0 61 60.3",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 61, height: 60.3 },
    },
    Settings: {
        image: <>
            <g>
                <g>
                    <path className="st0" d="M34.3,2.1h-7.1c-1.7,0-3.1,1.4-3.1,3.1v5.6c0,0.9-0.5,1.6-1.3,2c-0.8,0.3-1.7,0.2-2.3-0.5l-4-4
			c-1.2-1.2-3.2-1.2-4.4,0l-5,5c-0.6,0.6-0.9,1.4-0.9,2.2c0,0.8,0.3,1.6,0.9,2.2l4,4c0.6,0.6,0.8,1.5,0.5,2.3
			c-0.3,0.8-1.1,1.3-2,1.3H3.8c-1.7,0-3.1,1.4-3.1,3.1v7.1c0,1.7,1.4,3.1,3.1,3.1h5.6c0.9,0,1.6,0.5,2,1.3c0.3,0.8,0.2,1.7-0.5,2.3
			l-4,4c-0.6,0.6-0.9,1.4-0.9,2.2c0,0.8,0.3,1.6,0.9,2.2l5,5c1.2,1.2,3.2,1.2,4.4,0l4-4c0.6-0.6,1.5-0.8,2.3-0.5
			c0.8,0.3,1.3,1.1,1.3,2v5.6c0,1.7,1.4,3.1,3.1,3.1h7.1c1.7,0,3.1-1.4,3.1-3.1v-5.6c0-0.9,0.5-1.6,1.3-2c0.8-0.3,1.7-0.2,2.3,0.5
			l4,4c1.2,1.2,3.2,1.2,4.4,0l5-5c0.6-0.6,0.9-1.4,0.9-2.2c0-0.8-0.3-1.6-0.9-2.2l-4-4c-0.6-0.6-0.8-1.5-0.5-2.3
			c0.3-0.8,1.1-1.3,2-1.3h5.6c1.7,0,3.1-1.4,3.1-3.1v-6.2"/>
                    <path className="st0" d="M30.7,22.1c-5.5,0-10,4.5-10,10s4.5,10,10,10s10-4.5,10-10" />
                </g>
                <g>
                    <path className="st0" d="M34.2,29.6c0-7.3,5.9-13.2,13.2-13.2s13.2,5.9,13.2,13.2 M48.1,15.3c-4,0-7.3-3.3-7.3-7.3s3.3-7.3,7.3-7.3
			S55.3,4,55.3,8S52.1,15.3,48.1,15.3z"/>
                </g>
            </g>
        </>,
        viewBox: "0 0 61.4 62.7",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 61.4, height: 62.7 },
    },
    Tasks: {
        image: <>
            <g>
                <path className="st0" d="M16.8,67.8v17.7c0,0.9,0.7,1.6,1.6,1.6H75c0.9,0,1.6-0.7,1.6-1.6V3.6c0-0.9-0.7-1.6-1.6-1.6l-56.7,0
		c-0.9,0-1.6,0.7-1.6,1.6v29.9"/>
                <path className="st0" d="M26.1,24.1l3.1,3.1c0.3,0.3,0.7,0.5,1.1,0.5c0,0,0.1,0,0.1,0c0.5,0,0.9-0.3,1.1-0.6l4.7-6.3" />
                <path className="st0" d="M26.1,40.2l3.1,3.1c0.3,0.3,0.7,0.5,1.1,0.5c0,0,0.1,0,0.1,0c0.5,0,0.9-0.3,1.1-0.6l4.7-6.3" />
                <path className="st0" d="M69.4,24.1H45.1" />
                <path className="st0" d="M69.4,40.8H45.1" />
                <path className="st0" d="M69.4,57.5H45.1" />
                <path className="st0" d="M69.4,74.2H45.1" />
                <path className="st0" d="M24,63.6l1.1,1.1c0.4,0.4,1,0.6,1.5,0.4c0.5-0.1,1-0.6,1.1-1.1c0.1-0.5,0-1.1-0.4-1.5l-1.1-1.1
		c0-3.1-1.2-6-3.3-8.2L9.3,38.4c-0.8-0.9-2-1.5-3.2-1.5c-0.1,0-0.2,0-0.3,0h0c-1,0-2,0.3-2.8,0.8c-0.3,0.2-0.5,0.4-0.8,0.6
		c-1.9,1.9-1.9,4.9-0.1,6.8l2.4,2.6l0,0l11.2,12.1C17.8,62,20.8,63.5,24,63.6z"/>
                <line className="st0" x1="25.3" y1="0" x2="25.3" y2="8.4" />
                <line className="st0" x1="46.7" y1="0" x2="46.7" y2="8.4" />
                <line className="st0" x1="69.4" y1="0" x2="69.4" y2="8.4" />
            </g>
        </>,
        viewBox: "0 0 77.4 87.8",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 77.4, height: 87.8 },
    },
    Unisex: {
        image: <>
            <g>
                <g>
                    <circle className="st0" cx="38" cy="7.3" r="6.6" />
                    <path className="st0" d="M53.2,45.5l-6.7-23.3c-0.1-0.5-0.2-0.9-0.4-1.3l0,0l0,0c-1.3-3.4-4.5-5.7-8.3-5.7c-3.8,0-7,2.4-8.3,5.7l0,0
			l0,0c-0.2,0.4-0.3,0.9-0.4,1.3l-6.7,23.3h9.4H33v11c0,2.7,2.2,4.9,4.9,4.9c2.7,0,4.9-2.2,4.9-4.9v-11H53.2z"/>
                </g>
                <g>
                    <circle className="st0" cx="9.4" cy="7.3" r="6.6" />
                    <path className="st0" d="M9.4,15.3L9.4,15.3c-4.8,0-8.7,3.9-8.7,8.7v14.7c0,3,1.5,5.6,3.8,7.2v10.8c0,2.7,2.2,4.9,4.9,4.9h0
			c2.7,0,4.9-2.2,4.9-4.9V45.9c2.3-1.6,3.8-4.2,3.8-7.2V24C18.1,19.2,14.2,15.3,9.4,15.3z"/>
                </g>
            </g>
        </>,
        viewBox: "0 0 54.2 62.3",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 54.2, height: 62.3 },
    },
    UWorld: {
        image: <>
            <g>
                <g>
                    <path className="st0" d="M59,16.7l-1-1L44.8,2.5l-1-1C43.3,1,42.7,0.8,42,0.8H4C2.4,0.8,0.8,2,0.8,4.6v47.3v21.7v0.6
			c0,1.1,1.1,2.2,2.4,2.5c0.1,0,0.1,0,0.2,0.1c0.2,0,0.4,0.1,0.6,0.1h52.6c0.2,0,0.4,0,0.6-0.1c0.1,0,0.1,0,0.2-0.1
			c1.3-0.3,2.4-1.4,2.4-2.5v-0.6V51.9V19.1C59.8,18.1,59.6,17.3,59,16.7z"/>
                </g>
                <g>
                    <line className="st1" x1="9" y1="20.4" x2="38.2" y2="20.4" />
                    <line className="st1" x1="40.9" y1="20.4" x2="51.7" y2="20.4" />
                </g>
                <g>
                    <line className="st1" x1="9" y1="31.6" x2="30.3" y2="31.6" />
                    <line className="st1" x1="43.5" y1="31.6" x2="51.7" y2="31.6" />
                </g>
                <g>
                    <line className="st1" x1="9" y1="42.7" x2="35.6" y2="42.7" />
                    <line className="st1" x1="43.5" y1="42.7" x2="51.7" y2="42.7" />
                </g>
                <g>
                    <line className="st1" x1="9" y1="53.9" x2="27.7" y2="53.9" />
                    <line className="st1" x1="40.9" y1="53.9" x2="51.7" y2="53.9" />
                </g>
                <g>
                    <line className="st1" x1="9" y1="65" x2="32.9" y2="65" />
                    <line className="st1" x1="43.5" y1="65" x2="51.7" y2="65" />
                </g>
            </g>
        </>,
        viewBox: "0 0 60.5 77.6",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 60.5, height: 77.5 },
    },
    Search: {
        image: <>
            <g>
                <polyline className="st1" points="49.7,21.9 49.7,49.2 71.4,72.1 	" />
            </g>
        </>,
        viewBox: "0 0 98.3 98.3",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 98.3, height: 98.3 },
    },
    Delete: {
        image: <>
            <g>
                <polygon className="st0" points="51.4,11.1 51.4,0.8 27.6,0.8 27.6,11.1 0.8,11.1 0.8,28.6 6.7,28.6 6.7,95 72.3,95 72.3,28.6 
		78.2,28.6 78.2,11.1 	"/>
                <line className="st1" x1="27.5" y1="11.1" x2="51.6" y2="11" />
                <line className="st1" x1="5.1" y1="28.6" x2="73.6" y2="28.6" />
                <line className="st1" x1="23.2" y1="36.3" x2="23.2" y2="83.4" />
                <line className="st1" x1="40.6" y1="36.3" x2="40.6" y2="83.4" />
                <line className="st1" x1="58" y1="36.3" x2="58" y2="83.4" />
            </g>
        </>,
        viewBox: "0 0 79 95.7",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 79, height: 95.7 },
    },
    Dashboard: {
        image: <>
            <g>
                <rect x="0.8" y="72.2" className="st0" width="19.5" height="19.5" />
                <rect x="35.9" y="72.2" className="st0" width="19.5" height="19.5" />
                <rect x="71" y="72.2" className="st0" width="19.5" height="19.5" />
                <rect x="35.9" y="37.1" className="st0" width="19.5" height="19.5" />
                <rect x="71" y="37.1" className="st0" width="19.5" height="19.5" />
                <rect x="0.8" y="37.1" className="st0" width="19.5" height="19.5" />
                <rect x="35.9" y="0.8" className="st0" width="19.5" height="19.5" />
                <rect x="71" y="0.8" className="st0" width="19.5" height="19.5" />
                <rect x="0.8" y="0.8" className="st0" width="19.5" height="19.5" />
            </g>
        </>,
        viewBox: "0 0 91.2 92.4",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 91.2, height: 92.4 },
    },
    StarBadge: {
        image: <>
            <polygon className="st0" points="42.6,1 53.5,11.5 68.4,9.4 71,24.2 84.3,31.3 77.7,44.8 84.3,58.4 71,65.4 68.4,80.3 53.5,78.2 
	42.6,88.6 31.8,78.2 16.9,80.3 14.3,65.4 1,58.4 7.6,44.8 1,31.3 14.3,24.2 16.9,9.4 31.8,11.5 "/>
            <g>
                <path className="st1" d="M63.6,45c0,12.1-9.8,21.9-21.9,21.9S19.8,57.1,19.8,45s9.8-21.9,21.9-21.9c8.1,0,15.2,4.4,19,11" />
                <polyline className="st1" points="30.1,45.4 39.7,54 67.5,28.1 	" />
            </g>
        </>,
        viewBox: "0 0 85.3 89.7",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 85.3, height: 89.7 },
    },
    Drag: {
        image: <>
            <g>
                <path className="st0" d="M64.8,29.8h11.8c2.9,0,5.4,2.4,5.4,5.4v41.4c0,2.9-2.4,5.4-5.4,5.4H35.2c-2.9,0-5.4-2.4-5.4-5.4V66.3" />
                <path className="st0" d="M56.7,26.9l-6-6c-2.4-2.4-6.2-2.4-8.6,0c-0.7,0.7-1.2,1.5-1.5,2.4c-2.1-0.7-4.6-0.2-6.3,1.4
		c-0.9,0.9-1.4,2-1.7,3.1c-1.9-0.3-3.8,0.4-5.1,1.7c-1.3,1.3-1.9,3-1.8,4.7c-1.3,0.2-2.5,0.8-3.5,1.7c-1.1,1.1-1.8,2.7-1.8,4.3
		s0.6,3.1,1.8,4.3l1.7,1.7v7c0,5.3,4.4,9.7,9.7,9.7h8c11.7,0,21.1-9.5,21.1-21.1C62.9,36.2,60.7,30.9,56.7,26.9z"/>
                <g>
                    <g>
                        <line className="st1" x1="18.4" y1="52.8" x2="16.4" y2="52.8" />
                        <path className="dashed1" d="M13.5,52.8H6.1c-2.9,0-5.4-2.4-5.4-5.4V6.1c0-2.9,2.4-5.4,5.4-5.4h41.4c2.9,0,5.4,2.4,5.4,5.4v7.3" />
                        <line className="st1" x1="52.8" y1="14.8" x2="52.8" y2="16.8" />
                    </g>
                </g>
                <line className="st3" x1="40.7" y1="23.4" x2="49.6" y2="33" />
                <line className="st3" x1="32.7" y1="27.9" x2="41.9" y2="37.8" />
                <line className="st3" x1="25.8" y1="34.4" x2="35.5" y2="44.4" />
                <line className="st3" x1="24.1" y1="46.4" x2="31.6" y2="53.7" />
            </g>
        </>,
        viewBox: "0 0 82.7 82.7",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 82.7, height: 82.7 },
    },
    Cart: {
        image: <>
            <g>
                <g>
                    <g>
                        <path className="st0" d="M25.9,50.6l52.4-7.2c0.7,0,1.4-0.7,1.4-1.4l7.2-28.7c0,0,0-0.7-0.4-1.1c-0.4-0.4-0.7-0.7-1.4-0.7H16.9
				l-1.8-9.3c0-0.7-1.1-1.4-1.8-1.4H2.5c-1.1,0-1.8,0.7-1.8,1.8s0.7,1.8,1.8,1.8h9.3l8.6,43.8c1.1,5.7,6.5,10,12.2,10H74"/>
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st0" d="M31.3,61.8c-5,0-9,3.9-9,9c0,5,3.9,9,9,9c5,0,9-3.9,9-9C40.2,65.7,36.3,61.8,31.3,61.8z" />
                    </g>
                </g>
                <g>
                    <g>
                        <path className="st0" d="M67.2,61.8c-5,0-9,3.9-9,9c0,5,3.9,9,9,9c5,0,9-3.9,9-9S72.2,61.8,67.2,61.8z" />
                    </g>
                </g>
            </g>
        </>,
        viewBox: "0 0 87.6 80.5",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 87.6, height: 80.5 },
    },
    GroupPeople: {
        image: <>
            <g>
                <g>
                    <circle className="st0" cx="31.6" cy="7.8" r="5.5" />
                    <path className="st0" d="M31.6,14.4L31.6,14.4c-4,0-7.3,3.3-7.3,7.3V34c0,2.5,1.3,4.7,3.2,6v9c0,2.3,1.8,4.1,4.1,4.1h0
			c2.3,0,4.1-1.8,4.1-4.1v-9c1.9-1.3,3.2-3.5,3.2-6V21.7C38.9,17.7,35.7,14.4,31.6,14.4z"/>
                </g>
                <g>
                    <circle className="st0" cx="20.6" cy="10.9" r="5.3" />
                    <line className="st0" x1="13.8" y1="21.8" x2="13.8" y2="21.9" />
                    <path className="st0" d="M14.8,41.8h1.7v8.9c0,2.2,1.8,3.9,3.9,3.9s3.9-1.8,3.9-3.9v-8.9h8.5L27.5,23c-0.1-0.4-0.2-0.7-0.3-1.1l0,0
			l0,0c-1-2.7-3.7-4.6-6.7-4.6c-2.3,0-4.3,1.1-5.6,2.7"/>
                </g>
                <g>
                    <circle className="st0" cx="40.3" cy="8.3" r="5.7" />
                    <path className="st0" d="M47.6,21.1c-0.8-3.4-3.8-5.9-7.3-5.9h0c-4.1,0-7.5,3.4-7.5,7.5v12.7c0,2.6,1.3,4.9,3.3,6.2V51
			c0,2.3,1.9,4.2,4.2,4.2h0c2.3,0,4.2-1.9,4.2-4.2v-7"/>
                </g>
                <g>
                    <circle className="st0" cx="55.8" cy="6.6" r="5.9" />
                    <path className="st0" d="M64.5,23.7l-1.1-3.9c-0.1-0.4-0.2-0.8-0.3-1.2l0,0l0,0c-1.1-3-4-5.1-7.4-5.1s-6.3,2.1-7.4,5.1l0,0l0,0
			c-0.1,0.4-0.3,0.8-0.3,1.2L42,40.5h8.3h1v9.8c0,2.4,2,4.3,4.3,4.3s4.3-2,4.3-4.3v-9.8h4.8"/>
                </g>
                <g>
                    <circle className="st0" cx="72.3" cy="9" r="5.9" />
                    <path className="st0" d="M72.3,16.1L72.3,16.1c-4.3,0-7.7,3.5-7.7,7.7v13.1c0,2.6,1.3,5,3.4,6.4v9.6c0,2.4,2,4.3,4.3,4.3h0
			c2.4,0,4.3-2,4.3-4.3v-9.6c2-1.4,3.4-3.7,3.4-6.4V23.8C80,19.6,76.6,16.1,72.3,16.1z"/>
                </g>
                <g>
                    <circle className="st0" cx="8.5" cy="9" r="5.9" />
                    <path className="st0" d="M8.5,16.1L8.5,16.1c-4.3,0-7.7,3.5-7.7,7.7v13.1c0,2.6,1.3,5,3.4,6.4v9.6c0,2.4,2,4.3,4.3,4.3h0
			c2.4,0,4.3-2,4.3-4.3v-9.6c2-1.4,3.4-3.7,3.4-6.4V23.8C16.2,19.6,12.7,16.1,8.5,16.1z"/>
                </g>
            </g>
        </>,
        viewBox: "0 0 80.8 58",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 80.8, height: 58 },
    },
    Thumbsup: {
        image: <>
            <g>
                <path className="st0" d="M6.5,36.6H18c3.2,0,5.7,2.6,5.7,5.7V73c0,3.2-2.6,5.7-5.7,5.7H0.8v-1.9V42.4C0.8,39.2,3.3,36.6,6.5,36.6z" />
                <path className="st0" d="M76.8,54.2c-0.7,0.1-1.4,0.6-1.6,1.3c-0.2,0.7,0,1.5,0.5,2c1,0.9,1.5,2.1,1.5,3.5c0,2.4-1.8,4.4-4.2,4.7
		c-0.7,0.1-1.4,0.6-1.6,1.3c-0.2,0.7,0,1.5,0.5,2c1.3,1.2,1.8,2.8,1.4,4.6c-0.5,2.1-2.5,3.7-4.9,3.7H33.2c-2.8,0-7.4-1.2-9.6-2.8
		V42.1l2.8-1.4c0.4-0.2,0.7-0.5,0.9-0.9l11.5-24.9c0.1-0.3,0.6-4,0.6-4.3L39,1.8c0.8-0.4,2.2-1,3.8-1c2.1,0,7.6,5.2,7.6,11.5
		c0,6.7-3.7,16.4-3.7,16.5c-0.2,0.6-0.1,1.2,0.2,1.8c0.4,0.5,0.9,0.8,1.6,0.8h26.3c3.2,0,5.9,2.3,6.2,5.2c0.2,2.2-0.8,4.3-2.7,5.4
		c-0.6,0.4-0.9,1-0.9,1.7c0,0.7,0.4,1.3,1,1.6c1.6,0.8,2.6,2.4,2.6,4.2C81,51.9,79.2,53.9,76.8,54.2z"/>
            </g>
        </>,
        viewBox: "0 0 81.8 79.5",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 81.8, height: 79.5 },
    },
    Company: {
        image: <>
            <g>
                <path className="st0" d="M49.8,57.6V25.8 M63.9,57.6V34.2c0-0.4-0.3-0.7-0.8-0.7H49.8V23.1c0-0.4-0.3-0.7-0.8-0.7H25.2
		c-0.5,0-0.8,0.2-0.8,0.7v34.4"/>
                <line className="st0" x1="30.1" y1="30.5" x2="44.9" y2="30.5" />
                <line className="st0" x1="30.1" y1="37.1" x2="44.9" y2="37.1" />
                <line className="st0" x1="30.1" y1="43.6" x2="44.9" y2="43.6" />
                <line className="st0" x1="30.1" y1="50.7" x2="44.9" y2="50.7" />
                <line className="st0" x1="30.1" y1="56.4" x2="44.9" y2="56.4" />
            </g>
        </>,
        viewBox: "0 0 83.9 83.9",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 83.9, height: 83.9 },
    },
    Cup: {
        image: <>
            <g>
                <path className="st0" d="M22.2,43c-8,0-14.5-6-14.5-13.4v-5.6c0-3.9-1.1-7.6-3.3-10.9L1.4,8.3h17.6" />
                <path className="st0" d="M55.4,43c8,0,14.5-6,14.5-13.4v-5.6c0-3.9,1.1-7.6,3.3-10.9l3.1-4.7H59.7" />
                <g>
                    <g>
                        <path className="st0" d="M35.6,60.5v-9" />
                        <path className="st0" d="M42.1,51.5v9" />
                    </g>
                </g>
                <path className="st0" d="M67,0.8l-4.1,6.9c-2.9,4.8-4.4,10.4-4.4,16v8.2c0,10.8-8.8,19.6-19.6,19.6s-19.6-8.8-19.6-19.6v-8.2
		c0-5.6-1.5-11.2-4.4-16l-4.1-6.9L67,0.8L67,0.8z"/>
                <polyline className="st0" points="55.1,74.5 62.4,75.1 62.4,81.3 14.5,81.3 14.5,75.1 25.9,74.3 	" />
                <rect x="25.6" y="61.6" className="st0" width="26.4" height="12.8" />
            </g>
        </>,
        viewBox: " 0 77.6 82.1",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 77.6, height: 82.1 },
    },
    Company2: {
        image: <>
            <g>
                <path className="st0" d="M23.7,81.5v-47 M42.4,80.6h-5.9V46.9c0-0.6-0.3-1-0.8-1h-12V30.6c0-0.6-0.3-1-0.8-1H1.5c-0.5,0-0.8,0.4-0.8,1
		v50.9"/>
                <path className="st0" d="M65.5,81.8V8.4 M78.2,81.8v-54c0-1-0.3-1.5-0.8-1.5h-12V2.3c0-1-0.3-1.5-0.8-1.5H51.5
		c-0.5,0-9.1,45.2-9.1,46.2v34.8"/>
            </g>
        </>,
        viewBox: "0 0 79 81.8",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 79, height: 81.8 },
    },
    Lorry: {
        image: <>
            <path className="st0" d="M0.8,1.6c0.5-0.7,1.1-0.9,2-0.9c17.4,0,34.8,0,52.1,0c1.6,0,1.9,0.4,1.9,1.9c0,2.6,0,5.1,0,7.8
	c0.4,0,0.7,0.1,1,0.1c4.1,0,8.3,0,12.4,0c1,0,1.6,0.3,2.2,1.2c4,6.2,8,12.4,11.9,18.7c0.3,0.5,0.5,1.2,0.5,1.7c0,4.8,0,9.6,0,14.4
	c0,1.5-0.4,1.9-2,1.9c-2.2,0-4.3,0-6.5,0c-0.2,0.5-0.3,1-0.4,1.4c-1.2,3.4-4.6,5.7-8.2,5.5c-3.8-0.2-6.9-2.6-7.8-6.3
	c-0.1-0.5-0.3-0.7-0.8-0.7c-10,0-20,0-30,0c-0.1,0-0.2,0-0.4,0c-1.2,4.4-4,7.1-8.7,6.9c-4.4-0.1-6.9-2.8-8-6.9c-3.1,0-6.2,0-9.3,0
	c-0.9,0-1.5-0.2-2-1C0.8,32.2,0.8,16.9,0.8,1.6z"/>
            <path className="st0" d="M3.6,45.6c2.9,0,5.6,0,8.4,0c1.6-4.7,4.4-7,8.3-7c4,0,6.7,2.2,8.4,7" />
            <path className="st1" d="M56.9,11c0,10.8,0,23.8,0,34.6c1,0,1.8,0,2.8,0c1.1-4.2,3.7-6.8,8.1-6.9c4.7-0.1,7.5,2.5,8.7,6.9" />
            <path className="st2" d="M73.2,13.5c-3.3,0-6.7,0-10,0c-0.2,0-0.4,0.1-0.7,0.1c0,5.1,0,10.1,0,15.1c5.8,0,14.6,0,20.4,0" />
            <path className="st0" d="M68,52.6c3.1,0,5.6-2.5,5.6-5.5c0-3-2.5-5.6-5.5-5.7c-3.1,0-5.7,2.5-5.7,5.6C62.4,50.1,64.9,52.6,68,52.6z" />
            <path className="st0" d="M20.3,52.6c3.1,0,5.6-2.4,5.6-5.5c0-3.1-2.5-5.7-5.6-5.7c-3.1,0-5.6,2.5-5.6,5.6C14.7,50,17.3,52.6,20.3,52.6z"
            />
            <path className="st0" d="M68,52.6c-3.1,0-5.6-2.5-5.6-5.6c0-3.1,2.6-5.6,5.7-5.6c3.1,0,5.6,2.6,5.5,5.7C73.6,50.1,71.1,52.6,68,52.6z" />
        </>,
        viewBox: "0 0 85.6 56.1",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 85.6, height: 56.1 },
    },
    Shippping: {
        image: <>
            <g>
                <path className="st0" d="M7.8,53.5V36.4H2.5c-1,0-1.8-0.8-1.8-1.8v-8c0-4.9,4-8.8,8.8-8.8h0c0,0,12.5-0.2,12.4,0h0
		c3.9,0,7.4,2.5,8.8,6.2l0.1,0.2l0.9,5.9c0.3-0.7,5-12.2,5.8-12.2l6-3.2c0.2,0,0,3.3,0.2,3.3c0.9,0.4,1.4,1.4,1,2.3l-3.4,3.2
		l-4,11.1c-0.7,1.6-2.3,2.9-3.8,3.7"/>
                <path className="st0" d="M10.6,6.5c0-3.2,2.7-5.7,6.1-5.7s6.1,2.6,6.1,5.7v3.8c0,3.2-2.7,5.7-6.1,5.7s-6.1-2.6-6.1-5.7V6.5z" />
                <polyline className="st0" points="5,29.8 10.3,27.6 13.9,34.3 7.8,36.4 	" />
                <polyline className="st0" points="7.9,28.2 7.9,23.1 21.2,23.1 21.2,41.2 8.4,41.2 	" />
                <path className="st0" d="M41.9,39.1c-0.3-2.4,0-3.9,3.3-3.7c6.7,0.3,13.5,0.3,20.2,0c3.2-0.2,3.5,1.3,3.3,3.7" />
                <path className="st0" d="M52.3,40.6c-4.1-0.2-8.2-0.5-12.3-0.6c-0.6,0-1.7,1.1-1.7,1.7c-0.1,2.5,0.2,5,0.3,7.6" />
                <path className="st0" d="M71.8,49.2c0.1-2.5,0.4-5.1,0.3-7.6c0-0.6-1.1-1.7-1.7-1.7c-4.1,0.1-8.2,0.4-12.3,0.6" />
                <path className="st0" d="M64.2,34.8c0.3-2.7-0.2-4.4-3.6-4c-3.6,0.3-7.2,0.3-10.8,0c-3.4-0.3-3.9,1.3-3.6,4" />
                <path className="st0" d="M62.3,30.1c0.2-1.6-0.2-2.5-2.8-2.3c-2.8,0.2-5.6,0.2-8.4,0c-2.6-0.2-3,0.8-2.8,2.3" />
                <path className="st0" d="M38.7,75.3c-1.6-5.5-4.3-14.1-5.8-19.6c-0.2-0.8,0.1-2.3,0.7-2.8c2.3-1.6,4.8-2.9,7.2-4.4
		c4-2.5,10.5-8.1,14.5-10.7c0,0,12.3,8.5,16.3,11c2.4,1.5,4.9,2.8,7.2,4.4c0.6,0.4,1.2,1.5,1,2.1c-1.9,6.3-4,12.6-6.1,19"/>
                <path className="st0" d="M55.2,38.1c0,9.9,0,26.7,0,36.6" />
                <path className="st0" d="M48.4,50.7c-3.4,0.6-6.1,2.4-8.3,5.1" />
                <path className="st0" d="M71.1,55.7c-2.3-2.5-4.9-4.5-8.3-5.1" />
                <path className="st0" d="M83.7,72.7c-1.2,0.7-2.5,1.4-3.6,2.2c-2.2,1.7-4.8,1.5-6.8,0.2c-3.1-1.8-5.7-1.7-8.8,0c-3,1.7-6.1,1.9-9.4-0.2
		c-2.8-1.7-6.2-1.8-9.3,0.2c-2,1.3-4.6,2-6.8,0.7c-4.1-2.5-7.7-1.8-11.2,1.1"/>
                <path className="st0" d="M83.7,76.7c-1.2,0.7-2.5,1.4-3.6,2.2c-2.2,1.7-4.8,1.5-6.8,0.2c-3.1-1.8-5.7-1.7-8.8,0c-3,1.7-6.1,1.9-9.4-0.2
		c-2.8-1.7-6.2-1.8-9.3,0.2c-2,1.3-4.6,2-6.8,0.7"/>
            </g>
        </>,
        viewBox: "0 0 84.1 81.3",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 84.1, height: 81.3 },
    },
    Shippping2: {
        image: <>
            <g>
                <path className="st0" d="M11.2,21.6h12.6v2.1l0.3,0.6h8l8.8,10.8v8.5l-1.2,2.1h-1.3h-1.1c0,0-2.5-4.4-4.2-4.4S28,45.7,28,45.7H16.7
		c0,0-4.3-4.5-4.8-4.5c-0.5,0-4.8,4.4-4.8,4.4H2.9"/>
                <circle className="st1" cx="13" cy="45.4" r="4.4" />
                <circle className="st1" cx="33.3" cy="45.4" r="4.4" />
                <line className="st1" x1="17.4" y1="45.4" x2="28.9" y2="45.4" />
                <polyline className="st2" points="37.7,45.4 39.9,45.4 41.1,43.4 41.1,35.1 32.6,24.6 24.8,24.6 24.8,31.2 25.8,32.2 38.6,32.3 	" />
                <polyline className="st2" points="4.7,22.1 24.6,22.1 24.6,24.1 	" />
                <line className="st1" x1="3.1" y1="26.8" x2="16.1" y2="26.8" />
                <line className="st1" x1="4.7" y1="31.1" x2="14.8" y2="31.1" />
                <line className="st1" x1="0" y1="35.7" x2="13.2" y2="35.7" />
                <path className="st1" d="M51.8,64.3c-1.5-5-3.8-12.6-5.2-17.5c-0.2-0.7,0.1-2.1,0.6-2.5c2-1.5,4.3-2.6,6.4-3.9c3.6-2.2,9.4-7.3,13-9.5
		c0,0,11,7.6,14.6,9.8c2.1,1.3,4.3,2.5,6.4,3.9c0.5,0.3,1.1,1.4,0.9,1.9c-1.7,5.7-3.6,11.3-5.4,16.9"/>
                <path className="st1" d="M66.3,30.5c0,9,0,23.4,0,32.4" />
                <path className="st1" d="M91.9,60.9c-1.1,0.7-2.2,1.2-3.3,2c-2,1.5-4.3,1.3-6.2,0.2c-2.8-1.7-5.2-1.6-8,0c-2.7,1.6-5.5,1.7-8.6-0.2
		c-2.6-1.6-5.6-1.7-8.5,0.2c-1.8,1.1-4.2,1.9-6.2,0.7c-3.8-2.2-7-1.6-10.2,1"/>
                <path className="st1" d="M71.7,67.5c-2,1.5-4.3,1.3-6.2,0.2c-2.8-1.7-5.2-1.6-8,0c-2.7,1.6-5.5,1.7-8.6-0.2c-2.6-1.6-5.6-1.7-8.5,0.2"
                />
                <path className="st1" d="M80.8,45.6c-2.1-2.2-4.4-4.1-7.6-4.6" />
                <polyline className="st2" points="54.9,21.5 54.9,12.4 17.8,12.4 17.8,21.2 	" />
                <polyline className="st2" points="51.5,17.9 54.9,21.4 58.5,17.9 	" />
                <polyline className="st2" points="75.4,13 75.4,0.8 30.9,0.8 30.9,12.6 	" />
                <polyline className="st2" points="71.8,8.1 75.5,12.9 79.7,8.1 	" />
                <rect x="49.5" y="23.2" className="st1" width="11.1" height="8" />
                <rect x="67.6" y="14.6" className="st1" width="15.7" height="11.9" />
                <polyline className="st1" points="6.7,50.5 40.8,50.5 40.8,74.9 	" />
            </g>
        </>,
        viewBox: "0 0 92.3 74.9",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 92.3, height: 74.9 },
    },
    Shippping3: {
        image: <>
            <g>
                <g>
                    <path className="st0" d="M53.6,31.1c-0.6,3.7,1.9,7.2,5.5,7.8c2.2,0.4,4.4-0.4,6-1.9c0.3-0.3,0.2-0.8-0.1-1c-0.1-0.1-0.2-0.1-0.3-0.2
			l-4.2-1.1c-0.4-0.1-0.7-0.4-0.9-0.9c-0.2-0.6-0.2-1.2-0.1-1.7c0.3-1.2,1.3-2,2.1-1.8l4.1,1.1c0.1,0,0.1,0,0.2,0
			c0.4,0,0.7-0.3,0.7-0.7c0-0.1,0-0.2-0.1-0.3c-0.3-1.1-0.9-2-1.7-2.8c-1.3-1.3-3-2-4.8-2c-0.9,0-1.8,0.2-2.7,0.5l-16-16
			c0.6-3.7-1.8-7.2-5.5-7.8c-1.7-0.3-3.5,0.1-4.9,1c-0.3,0.2-0.4,0.7-0.2,1c0.1,0.1,0.1,0.2,0.3,0.2l3.4,1.9
			c0.7,0.4,0.9,1.7,0.3,2.7c-0.6,1.1-1.7,1.6-2.5,1.2l-3.1-1.7c-0.4-0.2-0.8-0.1-1,0.3c-0.1,0.1-0.1,0.3-0.1,0.4
			c0.2,3.7,3.4,6.6,7.2,6.3c0.8,0,1.5-0.2,2.2-0.5L53.6,31.1z"/>
                </g>
                <path className="st0" d="M42.1,24.3l-1.6-1.6c-0.6-0.6-1.5-0.6-2.1,0l-0.7,0.7c-0.6,0.6-0.6,1.5-0.1,2l-8.8,8.8c-0.6,0.6-0.6,1.5,0,2.1
		c0,0,0,0,0,0l2.5,2.5c0.6,0.6,1.5,0.6,2.1,0c0,0,0,0,0,0l8.8-8.8c0.6,0.5,1.5,0.5,2-0.1l0.7-0.7c0.6-0.6,0.6-1.5,0-2.1c0,0,0,0,0,0
		l-1.6-1.6"/>
                <polyline className="st0" points="45.7,23.3 43.5,25.5 41.8,24 44.1,21.7 	" />
                <path className="st0" d="M48.6,17.2l9.9-10c0.2-0.2,0.3-0.4,0.3-0.6l0.1-2.5l5.3-3.1l2.2,2.2l-3.1,5.3l-2.5,0.1c-0.2,0-0.5,0.1-0.6,0.3
		l-10,10"/>
                <polyline className="st0" points="23.1,57.6 23.1,47.4 79.3,47.4 79.3,58.3 	" />
                <polyline className="st0" points="82.6,64.9 86,58.5 34.1,58.5 26.5,51.4 1.9,51.8 18.7,66.6 	" />
                <path className="st1" d="M82.6,64.9c-6.4-2.4-12.5-0.3-13.6,0.5c-2.7,2-5.8,1.8-8.3,0.3c-3.8-2.2-7-2.1-10.7,0
		c-3.7,2.1-7.4,2.3-11.5-0.2c-3.4-2.1-7.5-2.2-11.4,0.2c-2.5,1.5-5.6,2.5-8.3,0.9c-3.8-2.3-7.2-2.4-10.5-0.8"/>
                <path className="st2" d="M73.4,67.6c-1.5,0.9-3,1.7-4.4,2.7c-2.7,2-5.8,1.8-8.3,0.3c-3.8-2.2-7-2.1-10.7,0c-3.7,2.1-7.4,2.3-11.5-0.2
		c-3.4-2.1-7.5-2.2-11.4,0.2c-2.5,1.5-5.6,2.5-8.3,0.9"/>
                <path className="st0" d="M59.9,66.4" />
                <path className="st0" d="M50.4,66.4" />
                <polyline className="st3" points="31.5,45.7 31.5,43.7 72,43.7 72,47.8 	" />
                <line className="st0" x1="28.9" y1="53.6" x2="58.9" y2="53.6" />
                <line className="st0" x1="63.2" y1="53.6" x2="76" y2="53.6" />
            </g>
        </>,
        viewBox: "0 0 87.3 73.1",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.MISC],
        size: { width: 87.3, height: 73.1 },
    },
}


