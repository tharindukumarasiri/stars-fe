import React from 'react';

export const Categories = {
    'COMMON': 'Common',
    'MISC': 'Miscellaneous',
    'ARROWS': 'Arrows',
    'BUSINESS': 'Business',
    'FLOWCHART': 'Flowchart',
    'CALLOUT': 'Callouts',
    'BPMN': 'BPMN2.0',
    'SOCIAL': 'Social',
    'STARS': 'Stars',
    'BANNERS': 'Banners',
    'GRIDS': 'Grids',
    'DATA_VISUALIZATION': 'Data Visualization'
}

export const parentNodes = ['Table', 'LineChart']

export const uploadNodeId = 'UploadedNode';

export default {
    Polygon: {
        image: <>
            <polygon class="st-0" points="72.8,10.5 27.2,10.5 4.4,50 27.2,89.5 72.8,89.5 95.6,50 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    RectangleDottedTwo: {
        image: <>
            <g>
                <g>
                    <polyline class="st-0" points="90.7,75 90.7,77 88.7,77 		" />
                    <line class="st-1" x1="79.3" y1="77" x2="65.7" y2="77" />
                    <line class="st-2" x1="65.7" y1="77" x2="11.3" y2="77" />
                    <polyline class="st-0" points="11.3,77 9.3,77 9.3,75 		" />
                    <line class="st-3" x1="9.3" y1="65.6" x2="9.3" y2="52.1" />
                    <line class="st-4" x1="9.3" y1="52.1" x2="9.3" y2="25" />
                    <polyline class="st-0" points="9.3,25 9.3,23 11.3,23 		" />
                    <line class="st-1" x1="20.7" y1="23" x2="34.3" y2="23" />
                    <line class="st-2" x1="34.3" y1="23" x2="88.7" y2="23" />
                    <polyline class="st-0" points="88.7,23 90.7,23 90.7,25 		" />
                    <line class="st-3" x1="90.7" y1="34.4" x2="90.7" y2="47.9" />
                    <line class="st-4" x1="90.7" y1="47.9" x2="90.7" y2="75" />
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    RectangleDotted: {
        image: <>
            <g>
                <g>
                    <polyline class="st-0" points="90.7,75.5 90.7,77 89.2,77 		" />
                    <line class="st-1" x1="85.3" y1="77" x2="78.6" y2="77" />
                    <line class="st-2" x1="78.6" y1="77" x2="10.8" y2="77" />
                    <polyline class="st-0" points="10.8,77 9.3,77 9.3,75.5 		" />
                    <line class="st-3" x1="9.3" y1="71.7" x2="9.3" y2="64.9" />
                    <line class="st-4" x1="9.3" y1="64.9" x2="9.3" y2="24.5" />
                    <polyline class="st-0" points="9.3,24.5 9.3,23 10.8,23 		" />
                    <line class="st-1" x1="14.7" y1="23" x2="21.4" y2="23" />
                    <line class="st-2" x1="21.4" y1="23" x2="89.2" y2="23" />
                    <polyline class="st-0" points="89.2,23 90.7,23 90.7,24.5 		" />
                    <line class="st-3" x1="90.7" y1="28.3" x2="90.7" y2="35.1" />
                    <line class="st-4" x1="90.7" y1="35.1" x2="90.7" y2="75.5" />
                </g>
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    RectangleDashedTwo: {
        image: <>
            <g>
                <g>
                    <polyline class="st-0" points="90.7,74.5 90.7,77 88.2,77 		" />
                    <line class="st-1" x1="83.1" y1="77" x2="14.3" y2="77" />
                    <polyline class="st-0" points="11.8,77 9.3,77 9.3,74.5 		" />
                    <line class="st-2" x1="9.3" y1="69.1" x2="9.3" y2="28.2" />
                    <polyline class="st-0" points="9.3,25.5 9.3,23 11.8,23 		" />
                    <line class="st-1" x1="16.9" y1="23" x2="85.7" y2="23" />
                    <polyline class="st-0" points="88.2,23 90.7,23 90.7,25.5 		" />
                    <line class="st-2" x1="90.7" y1="30.9" x2="90.7" y2="71.8" />
                </g>
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    RectangleThree: {
        image: <>
            <rect x="9.3" y="23" class="st-0" width="81.4" height="54" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    RectangleTwo: {
        image: <>
            <rect x="9.3" y="23" class="st-0" width="81.4" height="54" />
            <rect x="13" y="26.8" class="st-1" width="74" height="46.4" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Rectangle: {
        image: <>
            <rect x="9.3" y="23" class="st-0" width="81.4" height="54" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    LogOut: {
        image: <>
            <path class="st-0" d="M58.6,30.1V19.7c0-3.3-2.7-6-6-6H16.9c-3.3,0-6,2.7-6,6v59.5c0,3.3,2.7,6,6,6h35.7c3.3,0,6-2.7,6-6V68.8" />
            <line class="st-1" x1="89.3" y1="47.5" x2="38.4" y2="47.5" />
            <polyline class="st-1" points="71.3,68.5 90.4,47.5 71.1,26.6 " />
            <path class="st-2" d="M64.5,52.6" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    LocationPin: {
        image: <>
            <g>
                <path class="st-0" d="M50.3,24.8c-6.5,0-11.7,5.3-11.7,11.7s5.3,11.7,11.7,11.7S62,43,62,36.5S56.8,24.8,50.3,24.8z" />
                <path class="st-0" d="M72.7,14.1C66.6,8.1,58.6,4.7,50,4.7c-8.6,0-16.6,3.3-22.7,9.4c-11.2,11.2-12.6,32.3-3,45.1L50,96.3l25.7-37.1
           C85.3,46.4,83.9,25.3,72.7,14.1z"/>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    LeftPara: {
        image: <>
            <g>
                <g>
                    <path d="M18.8,79.6V20.4h13.6v4.1h-8.5v50.9h8.5v4.1H18.8z" />
                </g>
                <g>
                    <rect x="35.8" y="39.3" width="34.9" height="3.3" />
                    <rect x="35.8" y="56.4" width="27.8" height="3.3" />
                    <rect x="35.8" y="47.5" width="45.4" height="3.3" />
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    DoubleCircle: {
        image: <>
            <circle class="st-0" cx="50" cy="50" r="41.3" />
            <circle class="st-0" cx="50" cy="50" r="36.9" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    PolygonDashed: {
        image: <>
            <polygon class="st-0" points="72.8,10.5 27.2,10.5 4.4,50 27.2,89.5 72.8,89.5 95.6,50 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    CommonXTwo: {
        image: <>
            <path class="st-0" d="M90,27.9c-9.4,0-17-7.6-17-17c0-0.3,0-0.5,0-0.8H27.8c0,0.3,0,0.5,0,0.8c0,9.4-7.6,17-17,17c-0.2,0-0.5,0-0.7,0
       V73c0.2,0,0.5,0,0.7,0c9.4,0,17,7.6,17,17c0,0,0,0.1,0,0.1H73c0,0,0-0.1,0-0.1c0-9.4,7.6-17,17-17c0.1,0,0.1,0,0.2,0V27.9
       C90.1,27.9,90.1,27.9,90,27.9z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    CommonX: {
        image: <>
            <path class="st-0" d="M50.5,93.5c0,0-40.5-28.4-40.5-46.2v-8.7C10,20.9,24.4,6.5,42.1,6.5h15.7C75.6,6.5,90,20.9,90,38.6v8.7
       C90,65.1,50.5,93.5,50.5,93.5z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Write: {
        image: <>
            <g>
                <line class="st-0" x1="15" y1="85.3" x2="87.1" y2="85.3" />
                <path class="st-1" d="M78.1,17.6c-4.3-4.3-11.2-4.3-15.4,0L19.3,60.9c-0.3,0.3-0.5,0.7-0.6,1.1L13,82.5c-0.2,0.8,0,1.7,0.6,2.4
           c0.6,0.6,1.5,0.9,2.4,0.6l20.6-5.7c0.4-0.1,0.8-0.3,1.1-0.6l43.3-43.3c4.3-4.3,4.3-11.2,0-15.4L78.1,17.6z"/>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    TriangleTwo: {
        image: <>
            <polygon class="st-0" points="8.2,80.4 50,19.6 91.8,80.4 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Triangle: {
        image: <>
            <polygon class="st-0" points="8.2,69.2 50,27.5 91.8,69.2 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Slope: {
        image: <>
            <polygon class="st-0" points="9.9,54.5 9.9,90.7 90.1,90.7 90.1,9.3 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Share: {
        image: <>
            <circle class="st-0" cx="70.4" cy="20.3" r="11.2" />
            <circle class="st-0" cx="70.4" cy="78.8" r="11.2" />
            <circle class="st-0" cx="23.8" cy="49.5" r="11.2" />
            <line class="st-1" x1="60.3" y1="26.5" x2="33.2" y2="42.2" />
            <line class="st-1" x1="33.2" y1="56.6" x2="60.3" y2="72.3" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    BoxRounded: {
        image: <>
            <path class="st-0" d="M78.6,82.1H21.4c-6.9,0-12.6-5.6-12.6-12.6V30.5c0-6.9,5.6-12.6,12.6-12.6h57.2c6.9,0,12.6,5.6,12.6,12.6v39.1
       C91.2,76.5,85.5,82.1,78.6,82.1z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Shape9: {
        image: <>
            <polygon class="st-0" points="50,20.6 6.4,50 50,79.4 93.6,50 " />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Shape8: {
        image: <>
            <polygon class="st-0" points="43,14.3 70.2,14.3 50.2,42.2 64.8,42.2 29.8,85.7 43.4,50.7 30.2,50.7 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Shape7: {
        image: <>
            <g>
                <polygon class="st-0" points="13.9,35.6 45.3,14.8 86.4,14.8 86.4,52.9 63.1,84.9 	" />
                <rect x="13.6" y="36.3" class="st0" width="49" height="49" />
                <line class="st-0" x1="62.5" y1="36.3" x2="86.4" y2="14.8" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Shape6: {
        image: <>
            <polygon class="st-0" points="52.2,29.9 47.8,29.9 8.4,29.9 40.1,70.1 47.8,70.1 52.2,70.1 59.9,70.1 91.6,29.9 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Shape5: {
        image: <>
            <polygon class="st-0" points="86.8,83.7 66.3,83.7 13.2,16.3 86.8,16.3 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Shape4: {
        image: <>
            <polygon class="st-0" points="85.4,85.4 14.6,85.4 14.6,14.6 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Shape3: {
        image: <>
            <polygon class="st-0" points="48.6,18.5 17.2,18.5 17.2,81.5 48.6,81.5 82.8,50 " />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Shape2: {
        image: <>
            <polygon class="st-0" points="48.5,11.3 13.4,11.3 51.5,50 13.4,88.7 48.5,88.7 86.6,50 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Shape10: {
        image: <>
            <polygon class="st-0" points="87.1,14.4 12.9,14.4 46.7,50 12.9,85.6 87.1,85.6 53.3,50 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Shape1: {
        image: <>
            <polygon class="st-0" points="49.2,8.9 31,8.9 50.8,50 31,91.1 49.2,91.1 69,50 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Scale: {
        image: <>
            <g>
                <g>
                    <g>
                        <polyline class="st0" points="41.8,37.4 62.2,37.5 62.8,58.4 			" />
                    </g>
                    <line class="st-0" x1="62.2" y1="37.5" x2="31.4" y2="68.3" />
                </g>
                <rect x="14.1" y="12.2" class="st1" width="71.8" height="75.6" />
                <rect x="14.1" y="53.3" class="st2" width="32.3" height="34.6" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Rounded4: {
        image: <>
            <path class="st-0" d="M62.9,13.8H13.1c10.4,8.6,17,21.6,17,36.2s-6.6,27.5-17,36.2h49.8c13.3,0,24-10.8,24-24V37.9
       C86.9,24.6,76.1,13.8,62.9,13.8z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Rounded3: {
        image: <>
            <path class="st-0" d="M68.2,91.9H38.7c-13.9,0-25.3-11.3-25.3-25.3V37.1c0-13.9,11.3-25.3,25.3-25.3h29.5c13.9,0,25.3,11.3,25.3,25.3
       v29.5C93.5,80.6,82.2,91.9,68.2,91.9z"/>
            <path class="st-1" d="M69.3,86.7H37.7c-10.5,0-19-8.5-19-19V36.1c0-10.5,8.5-19,19-19h31.6c10.5,0,19,8.5,19,19v31.6
       C88.3,78.2,79.8,86.7,69.3,86.7z"/>
            <path class="st-1" d="M68.7,83H38.3c-8.8,0-16-7.1-16-16V36.7c0-8.8,7.1-16,16-16h30.4c8.8,0,16,7.1,16,16v30.4
       C84.6,75.9,77.5,83,68.7,83z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Rounded: {
        image: <>
            <path class="st-0" d="M67.4,90H32.6C20.1,90,10,79.9,10,67.4V32.6C10,20.1,20.1,10,32.6,10h34.8C79.9,10,90,20.1,90,32.6v34.8
       C90,79.9,79.9,90,67.4,90z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Rectangle: {
        image: <>
            <rect x="10" y="10" class="st0" width="80" height="80" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Pentagon: {
        image: <>
            <polygon class="st-0" points="50,9.4 7.3,40.4 23.6,90.6 76.4,90.6 92.7,40.4 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    OctagonThree: {
        image: <>
            <polygon class="st-0" points="68.3,6.2 32,6.2 6.2,32 6.2,68.3 32,94.1 68.3,94.1 94.1,68.3 94.1,32 " />
            <polygon class="st-1" points="66.7,10.1 33.6,10.1 10.1,33.6 10.1,66.7 33.6,90.2 66.7,90.2 90.2,66.7 90.2,33.6 " />
            <polygon class="st-1" points="65.4,13.4 34.9,13.4 13.4,34.9 13.4,65.4 34.9,86.9 65.4,86.9 86.9,65.4 86.9,34.9 " />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    OctagonTwo: {
        image: <>
            <polygon class="st-0" points="67.2,8.5 32.8,8.5 8.5,32.8 8.5,67.2 32.8,91.5 67.2,91.5 91.5,67.2 91.5,32.8 " />
            <polygon class="st-1" points="65.7,12.1 34.3,12.1 12.1,34.3 12.1,65.7 34.3,87.9 65.7,87.9 87.9,65.7 87.9,34.3 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Octagon2: {
        image: <>
            <polygon class="st-0" points="67.2,8.4 32.8,8.4 8.5,32.7 8.5,67.1 32.8,91.4 67.2,91.4 91.5,67.1 91.5,32.7 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Octagon: {
        image: <>
            <polygon class="st-0" points="50,7.3 14.9,24.2 6.2,62.2 30.5,92.7 69.5,92.7 93.8,62.2 85.1,24.2 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Hex: {
        image: <>
            <polygon class="st-0" points="72.5,11.1 27.5,11.1 5.1,50 27.5,88.9 72.5,88.9 94.9,50 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Diamond: {
        image: <>
            <rect x="18.5" y="19.1" transform="matrix(0.7071 0.7071 -0.7071 0.7071 50.4175 -20.5377)" class="st-0" width="63.1" height="63.1" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Circle: {
        image: <>
            <path class="st-0" d="M50,92.8L50,92.8C26.4,92.8,7.2,73.6,7.2,50v0C7.2,26.4,26.4,7.2,50,7.2h0c23.6,0,42.8,19.1,42.8,42.8v0
       C92.8,73.6,73.6,92.8,50,92.8z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Cells: {
        image: <>
            <rect x="12.9" y="13.4" class="st0" width="73" height="72.3" />
            <polyline class="st-0" points="22,33.4 22,24.3 32.4,24.3 " />
            <polyline class="st-0" points="44.8,33.4 44.8,24.3 55.2,24.3 " />
            <polyline class="st-0" points="67.6,33.4 67.6,24.3 78,24.3 " />
            <polyline class="st-0" points="22,53.6 22,44.5 32.4,44.5 " />
            <polyline class="st-0" points="44.8,53.6 44.8,44.5 55.2,44.5 " />
            <polyline class="st-0" points="67.6,53.6 67.6,44.5 78,44.5 " />
            <polyline class="st-0" points="22,73.8 22,64.7 32.4,64.7 " />
            <polyline class="st-0" points="44.8,73.8 44.8,64.7 55.2,64.7 " />
            <polyline class="st-0" points="67.6,73.8 67.6,64.7 78,64.7 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    AngledBoxThick: {
        image: <>
            <rect x="18.7" y="18.7" transform="matrix(0.7071 0.7071 -0.7071 0.7071 50 -20.7107)" class="st-0" width="62.7" height="62.7" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    AngledBoxDashed: {
        image: <>
            <rect x="18.7" y="18.7" transform="matrix(0.7071 0.7071 -0.7071 0.7071 50 -20.7107)" class="st-0" width="62.7" height="62.7" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    AngledBox: {
        image: <>
            <rect x="18.7" y="18.7" transform="matrix(0.7071 0.7071 -0.7071 0.7071 50 -20.7107)" class="st-0" width="62.7" height="62.7" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Alert: {
        image: <>
            <path class="st-0" d="M95.7,80.7L55.1,10.3c-2.4-4.1-8.3-4.1-10.6,0L3.9,80.7c-2.4,4.1,0.6,9.2,5.3,9.2h81.2
       C95.2,89.9,98.1,84.8,95.7,80.7z"/>
            <line class="st-0" x1="50.1" y1="62.1" x2="50.1" y2="36.4" />
            <line class="st-0" x1="50.1" y1="71.6" x2="50.1" y2="66.5" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Arrow1: {
        image: <>
            <polygon class="st-0" points="84.5,51.6 62.8,29.9 62.8,38.3 18.2,38.3 18.2,64.9 62.8,64.9 62.8,73.3 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.ARROWS],
    },
    Arrow2: {
        image: <>
            <polygon class="st-0" points="60.4,37.8 60.4,37.8 60.4,27.1 67,27.1 50,10.1 33,27.1 39.6,27.1 39.6,62.2 39.6,62.2 39.6,72.9 
       33,72.9 50,89.9 67,72.9 60.4,72.9 "/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.ARROWS],
    },
    Arrow3: {
        image: <>
            <polygon class="st-0" points="88.8,50 72.2,33.4 72.2,39.9 60.1,39.9 60.1,38.1 60.1,38.1 60.1,27.8 66.6,27.8 50,11.2 33.4,27.8 
       39.9,27.8 39.9,39.9 38.1,39.9 38.1,39.9 27.8,39.9 27.8,33.4 11.2,50 27.8,66.6 27.8,60.1 39.9,60.1 39.9,61.9 39.9,61.9 
       39.9,72.2 33.4,72.2 50,88.8 66.6,72.2 60.1,72.2 60.1,60.1 61.9,60.1 61.9,60.1 72.2,60.1 72.2,66.6 "/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.ARROWS],
    },
    Arrow4: {
        image: <>
            <polygon class="st-0" points="89.7,63.5 72.8,46.6 72.8,53.1 60.4,53.1 60.4,36.5 67,36.5 50,19.5 33,36.5 39.6,36.5 39.6,53.1 
       37.8,53.1 37.8,53.1 27.2,53.1 27.2,46.6 10.3,63.5 27.2,80.5 27.2,73.9 62.2,73.9 62.2,73.9 72.8,73.9 72.8,80.5 "/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.ARROWS],
    },
    Arrow5: {
        image: <>
            <path class="st-0" d="M86.5,26L72.1,11.5v5.6l-28.6,0c-0.4,0-0.8,0-1.1,0h0v0C30,17.7,20.1,28,20.1,40.5v46.7h17.8V40.5
       c0-3.1,2.5-5.6,5.6-5.6l28.6,0v5.6L86.5,26z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.ARROWS],
    },
    Arrow6: {
        image: <>
            <g>
                <polygon class="st-0" points="92,50 74.7,32.7 74.7,39.4 39,39.4 39,60.6 74.7,60.6 74.7,67.3 	" />
                <rect x="26.9" y="39.4" class="st0" width="8" height="21.1" />
                <rect x="16.8" y="39.4" class="st0" width="5.7" height="21.1" />
                <rect x="8" y="39.4" class="st0" width="4" height="21.1" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.ARROWS],
    },
    Arrow7: {
        image: <>
            <polygon class="st-0" points="86.7,50 61.2,24.5 61.2,34.4 13.3,34.4 29,50 13.3,65.6 61.2,65.6 61.2,75.5 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.ARROWS],
    },
    Arrow8: {
        image: <>
            <path class="st-0" d="M86.8,72.6V30.8c0-9.4-7.6-17-17-17H25c-9.4,0-17,7.6-17,17v16.4h16.7V30.8c0-0.2,0.2-0.4,0.4-0.4h44.7
       c0.2,0,0.4,0.2,0.4,0.4v41.8h-5.2l13.6,13.6L92,72.6H86.8z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.ARROWS],
    },
    Arrow9: {
        image: <>
            <path class="st-0" d="M85.4,62.2c-0.1-20.9-17.1-37.9-38.1-37.9c-21,0-38.1,17.1-38.1,38.1h16.6c0-11.8,9.6-21.4,21.4-21.4
       c11.8,0,21.3,9.5,21.4,21.3h-5.2l13.5,13.5l13.5-13.5H85.4z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.ARROWS],
    },
    Arrow10: {
        image: <>
            <path class="st-0" d="M79.2,61.8L91,50h-4.3c0-21.4-17.5-38.8-38.9-38.8C26.4,11.1,9,28.6,9,50c0,21.4,17.4,38.9,38.9,38.9
       c12.1,0,23.2-5.5,30.7-15l-11.5-9c-4.6,6-11.6,9.4-19.2,9.4c-13.4,0-24.3-10.9-24.3-24.3s10.9-24.3,24.3-24.3
       c13.4,0,24.3,10.9,24.3,24.3h-4.9L79.2,61.8z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.ARROWS],
    },
    WorldWideDocs: {
        image: <>
            <path class="st-0" d="M20.6,31.2c0,0-6.7,0-7.9,0s-5,0.1-5,5.1s-0.8,34.1,0,35C8.5,72.1,8,76,13,76s25.5,0,25.5,0s4.3,11,11.2,14.8
       s18.6,6.2,28.3,1.2c9.7-5,16.6-17.2,15.1-26.6c-1.5-9.4-6-15.3-8.7-18.2c-2.8-2.9-3.2-3.7-3.2-3.7v-29l-8.9-8.7c0,0-21.5,0-25.2,0
       c-3.7,0-4.7,2.1-4.7,3.7s0,7.8,0,7.8s-14.2,0-16.2,0s-5.4,1-5.4,3.7S20.6,31.2,20.6,31.2z"/>
            <g>
                <g>
                    <path class="st-1" d="M46.5,45.1V40c0-0.3-0.1-0.5-0.3-0.7l-8.1-8.1c-0.2-0.2-0.4-0.3-0.7-0.3H12.5c-2.6,0-4.6,2.1-4.6,4.6V71
               c0,2.6,2.1,4.6,4.6,4.6h21.3 M36.5,31v5.4c0,1.2,0.5,2.4,1.4,3.3c0.9,0.9,1.9,1.4,3.3,1.4h5.4"/>
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M59.3,39.2V26.1c0-0.3-0.1-0.5-0.3-0.7l-8.1-8.1c-0.2-0.2-0.4-0.3-0.7-0.3H25.3c-2.6,0-4.6,2.1-4.6,4.6v8.1
                M49.3,17v5.4c0,1.2,0.5,2.4,1.4,3.3c0.9,0.9,1.9,1.4,3.3,1.4h5.4"/>
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M81.2,43.4V14.8c0-0.3-0.1-0.5-0.3-0.7L72.8,6c-0.2-0.2-0.4-0.3-0.7-0.3H47.2c-2.6,0-4.6,2.1-4.6,4.6v5.3
                M71.2,5.7v5.4c0,1.2,0.5,2.4,1.4,3.3c0.9,0.9,1.9,1.4,3.3,1.4h5.4"/>
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M33.2,42.8H15.6" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M33.2,49.6H15.6" />
                </g>
            </g>
            <path class="st-1" d="M83,88.7l-1.5-2.7l4.1-9.6c0.4-1,0.1-2.2-0.8-2.9l-3.3-2.2L81.6,60l3.5-4.4l5-0.8C95.9,66.4,93,80.4,83,88.7z
        M79.2,91.4c-7.7,4.4-17,5-25.2,1.4C45.9,89.2,39.9,82,38,73.4 M44.7,48.5c5.6-6.1,13.6-9.4,21.9-9c8.3,0.4,15.9,4.4,20.9,11
        M41.8,52.2l6.8,4.5c0.4,0.2,0.8,0.4,1.2,0.4l12.2,0.2l3.6,6.3l-7.1,4l-4,8.9l-7.1-7.4c-0.5-0.6-1.2-0.9-1.9-0.8l-8.1,0.5
       C37.1,62.9,38.7,57.1,41.8,52.2z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    WhatDocs: {
        image: <>
            <path class="st-0" d="M85.4,93h-70c-4.3,0-7.7-3.5-7.7-7.7V15.2c0-4.3,3.5-7.7,7.7-7.7h70c4.3,0,7.7,3.5,7.7,7.7v70.1
       C93.1,89.5,89.6,93,85.4,93z"/>
            <g>
                <g>
                    <path class="st-1" d="M67.6,21.5l-4-4.2c-0.3-0.3-0.6-0.4-1-0.4H27.5c-3.6,0-6.6,2.9-6.6,6.6v50c0,3.6,2.9,6.6,6.6,6.6 M75.5,61.2"
                    />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M82.1,49.2V34.8c0-0.4-0.1-0.7-0.4-1L70.2,22.4c-0.3-0.3-0.6-0.4-1-0.4H34.1c-3.6,0-6.6,2.9-6.6,6.6v50
               c0,3.6,2.9,6.6,6.6,6.6h14.7 M67.9,22v7.6c0,1.8,0.7,3.4,1.9,4.6c1.2,1.2,2.6,1.9,4.6,1.9H82"/>
                </g>
            </g>
            <circle class="st-1" cx="58.7" cy="63.2" r="23.4" />
            <g>
                <path class="st-1" d="M52.4,58.1c0-1.7,0.6-3.1,1.9-4.2c1.2-1.1,2.8-1.6,4.8-1.6c2,0,3.6,0.5,4.7,1.6c1.1,1.1,1.7,2.6,1.7,4.5
           c0,1.9-0.9,3.7-2.6,5.5l-1.8,1.7c-0.8,0.9-1.2,2.1-1.2,3.7"/>
            </g>
            <line class="st-1" x1="59.8" y1="72.7" x2="59.8" y2="75.2" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    WatchingDoc: {
        image: <>
            <path class="st-0" d="M77.7,90.7H23.4c-5,0-9-4-9-8.9V16.1c0-4.9,4.1-8.9,9-8.9h46.4l16.9,16.2v58.4C86.7,86.7,82.7,90.7,77.7,90.7z"
            />
            <g>
                <g>
                    <path class="st-1" d="M86.7,45.9V24.2c0-0.5-0.2-0.9-0.5-1.3L71,7.8c-0.3-0.3-0.8-0.5-1.3-0.5H23.4c-4.8,0-8.7,3.9-8.7,8.7v66
               c0,4.8,3.9,8.7,8.7,8.7h8.7 M68,7.3v10c0,2.3,0.9,4.5,2.5,6.1c1.6,1.6,3.5,2.5,6.1,2.5h10"/>
                </g>
            </g>
            <circle class="st-2" cx="57.3" cy="63.2" r="24.8" />
            <path class="st-2" d="M48.2,74.2c0,0,9,1.9,17.7-4.8" />
            <line class="st-2" x1="41.7" y1="63.3" x2="48.8" y2="60.4" />
            <line class="st-2" x1="55.7" y1="60" x2="62.9" y2="57.1" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Wallet: {
        image: <>
            <path class="st-0" d="M87.3,49.6V38.4c0-3.8-3-6.9-6.7-7.2L70.2,12.9c-1-1.7-2.5-2.9-4.4-3.4C63.9,9,62,9.3,60.3,10.2L24.5,31.1h-6.3
       c-4,0-7.3,3.3-7.3,7.3V82c0,4,3.3,7.3,7.3,7.3h61.8c4,0,7.3-3.3,7.3-7.3V70.7C89.5,70,91,68,91,65.6V54.7
       C91,52.3,89.5,50.3,87.3,49.6z"/>
            <line class="st-1" x1="80.2" y1="31.1" x2="37" y2="31.1" />
            <line class="st-2" x1="73.3" y1="19.1" x2="53.4" y2="31.1" />
            <line class="st-2" x1="69.9" y1="12.7" x2="38.9" y2="31.1" />
            <path class="st-2" d="M72.8,49.3c-6,0-10.9,4.9-10.9,10.9c0,6,4.9,10.9,10.9,10.9h14.4" />
            <path class="st-2" d="M72.8,56.5c-2,0-3.6,1.6-3.6,3.6c0,2,1.6,3.6,3.6,3.6c2,0,3.6-1.6,3.6-3.6C76.4,58.2,74.8,56.5,72.8,56.5z" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    VerticalDoc: {
        image: <>
            <g>
                <g>
                    <path class="st-0" d="M84.3,24.7l-15-15c-0.3-0.3-0.8-0.5-1.3-0.5H22c-4.7,0-8.6,3.9-8.6,8.6v65.5c0,4.7,3.9,8.6,8.6,8.6h54.2
               c4.7,0,8.6-3.9,8.6-8.6V25.9C84.8,25.5,84.6,25,84.3,24.7z M66.2,9.2v9.9c0,2.3,0.9,4.5,2.5,6.1c1.6,1.6,3.4,2.5,6.1,2.5h9.9"/>
                </g>
            </g>
            <line class="st-1" x1="34.8" y1="35.1" x2="34.8" y2="74.4" />
            <line class="st-1" x1="49.3" y1="35.1" x2="49.3" y2="74.4" />
            <line class="st-1" x1="63.8" y1="35.1" x2="63.8" y2="74.4" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    UserGlobe: {
        image: <>
            <ellipse class="st-0" cx="50.8" cy="50.5" rx="20.7" ry="20.7" />
            <g>
                <path class="st-1" d="M8.7,37c0-5.4,4.4-9.7,9.7-9.7s9.7,4.4,9.7,9.7 M18.9,26.4c-2.9,0-5.3-2.4-5.3-5.3s2.4-5.3,5.3-5.3
           s5.3,2.4,5.3,5.3S21.8,26.4,18.9,26.4z"/>
            </g>
            <g>
                <path class="st-1" d="M72.6,37c0-5.4,4.4-9.7,9.7-9.7c5.4,0,9.7,4.4,9.7,9.7 M82.8,26.4c-2.9,0-5.3-2.4-5.3-5.3s2.4-5.3,5.3-5.3
           s5.3,2.4,5.3,5.3S85.7,26.4,82.8,26.4z"/>
            </g>
            <g>
                <path class="st-1" d="M8.7,83.3c0-5.4,4.4-9.7,9.7-9.7s9.7,4.4,9.7,9.7 M18.9,72.7c-2.9,0-5.3-2.4-5.3-5.3c0-2.9,2.4-5.3,5.3-5.3
           s5.3,2.4,5.3,5.3C24.2,70.3,21.8,72.7,18.9,72.7z"/>
            </g>
            <g>
                <path class="st-1" d="M72.6,83.3c0-5.4,4.4-9.7,9.7-9.7c5.4,0,9.7,4.4,9.7,9.7 M82.8,72.7c-2.9,0-5.3-2.4-5.3-5.3
           c0-2.9,2.4-5.3,5.3-5.3s5.3,2.4,5.3,5.3C88.1,70.3,85.7,72.7,82.8,72.7z"/>
            </g>
            <path class="st-2" d="M8.3,43.3c-0.8,4.7-0.8,9.5,0,14.3" />
            <path class="st-2" d="M92.6,57.5c0.8-4.7,0.8-9.5,0-14.3" />
            <path class="st-2" d="M70.1,12.4C57.8,6,43.2,6,30.8,12.4" />
            <path class="st-3" d="M33.3,89.6c10.9,4.8,23.3,4.8,34.2,0h0" />
            <path class="st-2" d="M63.5,66.2l-1.1-2l3-7.1c0.3-0.8,0.1-1.6-0.6-2.1l-2.4-1.6l0.1-8.5l2.6-3.3l3.7-0.6
       C73.1,49.7,70.9,60.1,63.5,66.2z M60.7,68.1c-5.7,3.3-12.5,3.7-18.5,1c-6-2.6-10.4-7.9-11.8-14.3 M35.3,36.5
       c4.1-4.5,10-6.9,16.1-6.6c6.1,0.3,11.7,3.3,15.4,8.1 M33.2,39.2l5,3.3c0.3,0.2,0.6,0.3,0.9,0.3l9,0.1l2.7,4.6l-5.2,3l-3,6.6
       l-5.2-5.4c-0.3-0.4-0.9-0.7-1.4-0.6l-6,0.4C29.8,47.1,30.9,42.9,33.2,39.2z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    UserSettings: {
        image: <>
            <g>
                <path class="st-0" d="M54.5,8.7h-10c-2.4,0-4.3,1.9-4.3,4.3v7.9c0,1.3-0.7,2.3-1.9,2.8c-1.2,0.5-2.4,0.2-3.3-0.7l-5.6-5.6
           c-1.6-1.6-4.5-1.6-6.1,0l-7.1,7.1c-0.8,0.8-1.3,1.9-1.3,3.1c0,1.2,0.5,2.2,1.3,3.1l5.6,5.6c0.9,0.9,1.1,2.1,0.7,3.3
           c-0.5,1.2-1.5,1.9-2.8,1.9h-7.9c-2.4,0-4.3,1.9-4.3,4.3v10c0,2.4,1.9,4.3,4.3,4.3h7.9c1.3,0,2.3,0.7,2.8,1.9s0.2,2.4-0.7,3.3
           l-5.6,5.6c-0.8,0.8-1.3,1.9-1.3,3.1c0,1.2,0.5,2.2,1.3,3.1l7.1,7.1c1.6,1.6,4.5,1.6,6.1,0l5.6-5.6c0.9-0.9,2.1-1.1,3.3-0.7
           c1.2,0.5,1.9,1.5,1.9,2.8v7.9c0,2.4,1.9,4.3,4.3,4.3h10c2.4,0,4.3-1.9,4.3-4.3v-7.9c0-1.3,0.7-2.3,1.9-2.8c1.2-0.5,2.4-0.2,3.3,0.7
           l5.6,5.6c1.6,1.6,4.5,1.6,6.1,0l7.1-7.1c0.8-0.8,1.3-1.9,1.3-3.1c0-1.2-0.5-2.2-1.3-3.1l-5.6-5.6c-0.9-0.9-1.1-2.1-0.7-3.3
           s1.5-1.9,2.8-1.9h7.9c2.4,0,4.3-1.9,4.3-4.3v-8.7"/>
                <path class="st-0" d="M49.5,36.8c-7.7,0-14,6.3-14,14s6.3,14,14,14s14-6.3,14-14" />
            </g>
            <g>
                <path class="st-0" d="M54.4,47.4c0-10.2,8.3-18.6,18.6-18.6s18.6,8.3,18.6,18.6 M73.9,27.2c-5.6,0-10.2-4.6-10.2-10.2
           S68.3,6.8,73.9,6.8c5.6,0,10.2,4.6,10.2,10.2S79.5,27.2,73.9,27.2z"/>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    UserList: {
        image: <>
            <g>
                <g>
                    <path class="st-0" d="M23.2,80.7v5.4c0,1,0.8,1.9,1.9,1.9h63.2c1,0,1.9-0.8,1.9-1.9V30.4c0-1-0.8-1.9-1.9-1.9h-5.1" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-0" d="M15.8,73.5v5.3c0,1,0.8,1.9,1.9,1.9h63.2c1,0,1.9-0.8,1.9-1.9V22.9c0-1-0.8-1.9-1.9-1.9h-5.6" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-0" d="M73.4,13.6H10.2c-1,0-1.9,0.8-1.9,1.9v55.8c0,1,0.8,1.9,1.9,1.9h63.2c1,0,1.9-0.8,1.9-1.9V15.5
               C75.3,14.5,74.4,13.6,73.4,13.6z"/>
                </g>
            </g>
            <g>
                <g>
                    <g>
                        <path class="st-0" d="M27.6,39.7c-3.1,0-5.6-2.5-5.6-5.6s2.5-5.6,5.6-5.6s5.6,2.5,5.6,5.6C33.2,37.2,30.6,39.7,27.6,39.7z" />
                    </g>
                </g>
                <path class="st-0" d="M16.1,58.3c0-10.2,5.1-18.5,11.4-18.5S39,48,39,58.3" />
            </g>
            <line class="st-0" x1="43.7" y1="33.6" x2="68.1" y2="33.6" />
            <line class="st-0" x1="43.7" y1="39.7" x2="68.1" y2="39.7" />
            <line class="st-0" x1="43.7" y1="45.8" x2="61" y2="45.8" />
            <line class="st-0" x1="43.7" y1="51.9" x2="68.1" y2="51.9" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    UploadDoc: {
        image: <>
            <path class="st-0" d="M76.9,91.5H22.6c-5,0-9-4-9-8.9V16.7c0-4.9,4.1-8.9,9-8.9H69l16.9,17.8v57C85.9,87.5,81.9,91.5,76.9,91.5z" />
            <g>
                <g>
                    <path class="st-1" d="M85.9,46.7V25.1c0-0.5-0.2-0.9-0.5-1.3L70.3,8.6c-0.3-0.3-0.8-0.5-1.3-0.5H22.6c-4.8,0-8.7,3.9-8.7,8.7v66
               c0,4.8,3.9,8.7,8.7,8.7h8.7 M67.2,8.2v10c0,2.3,0.9,4.5,2.5,6.1c1.6,1.6,3.5,2.5,6.1,2.5h10"/>
                </g>
            </g>
            <g>
                <g>
                    <polyline class="st-1" points="38.2,59.2 49.9,47.6 60,59.2 		" />
                </g>
                <line class="st-1" x1="49.9" y1="47.6" x2="49.9" y2="88" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Upload: {
        image: <>
            <path class="st-0" d="M61.5,68.6c5.8,0.1,9.9,0.2,9.9,0.2c11.3,0,20.4-9.2,20.4-20.4S82.7,28,71.4,28c-2.3,0-4.5,0.4-6.6,1.1l0,0
       c-2.7-6.1-8.8-10.4-16-10.4c-4.3,0-8.2,1.6-11.3,4.1c-1.6-1.1-3.5-1.7-5.6-1.7c-5.6,0-10.1,4.5-10.1,10.1c0,0.9,0.1,1.9,0.4,2.7
       c-8.7,0.7-15.6,8-15.6,16.9c0,9,7,16.4,15.9,16.9c0.1,0,5.5,0.1,12.6,0.3"/>
            <g>
                <g>
                    <polyline class="st-1" points="31.7,54.3 47.8,38.3 64.7,54.3 		" />
                </g>
                <line class="st-1" x1="47.8" y1="38.3" x2="47.8" y2="86.8" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Unspsc: {
        image: <>

            <path class="st-0" d="M38.5,91.8H28.2c-0.2,0-0.4-0.2-0.4-0.4V65.3c0-0.2,0.2-0.4,0.4-0.4h10.4c0.2,0,0.4,0.2,0.4,0.4v26.2
       C38.9,91.6,38.7,91.8,38.5,91.8z"/>
            <path class="st-0" d="M18.9,91.8H8.8c-0.2,0-0.4-0.2-0.4-0.4V76.8c0-0.2,0.2-0.4,0.4-0.4h10.1c0.2,0,0.4,0.2,0.4,0.4v14.7
       C19.3,91.6,19.1,91.8,18.9,91.8z"/>
            <path class="st-0" d="M18.9,68.5H8.8c-0.2,0-0.4-0.2-0.4-0.4V54.8c0-0.2,0.2-0.4,0.4-0.4h10.1c0.2,0,0.4,0.2,0.4,0.4v13.3
       C19.3,68.3,19.1,68.5,18.9,68.5z"/>
            <path class="st-0" d="M92.5,91.8h-9.7c-0.2,0-0.4-0.2-0.4-0.4V76.8c0-0.2,0.2-0.4,0.4-0.4h9.7c0.2,0,0.4,0.2,0.4,0.4v14.7
       C92.9,91.6,92.7,91.8,92.5,91.8z"/>
            <path class="st-0" d="M92.5,69.2h-9.7c-0.2,0-0.4-0.2-0.4-0.4V55.6c0-0.2,0.2-0.4,0.4-0.4h9.7c0.2,0,0.4,0.2,0.4,0.4v13.3
       C92.9,69.1,92.7,69.2,92.5,69.2z"/>
            <path class="st-0" d="M73.7,91.8h-8.5c-0.2,0-0.4-0.2-0.4-0.4V79.2c0-0.2,0.2-0.4,0.4-0.4h8.5c0.2,0,0.4,0.2,0.4,0.4v12.3
       C74,91.6,73.9,91.8,73.7,91.8z"/>
            <path class="st-0" d="M70.2,71.6h-1.6c-2.1,0-3.8-1.7-3.8-3.8v-5.4c0-2.1,1.7-3.8,3.8-3.8h1.6c2.1,0,3.8,1.7,3.8,3.8v5.4
       C74,69.9,72.3,71.6,70.2,71.6z"/>
            <path class="st-0" d="M57.3,91.8H47.2c-0.2,0-0.4-0.2-0.4-0.4V62.8c0-0.2,0.2-0.4,0.4-0.4h10.1c0.2,0,0.4,0.2,0.4,0.4v28.6
       C57.7,91.6,57.5,91.8,57.3,91.8z"/>
            <ellipse class="st-0" cx="49.3" cy="17.9" rx="8.1" ry="9.5" />
            <path class="st-0" d="M28.8,50.8L18.1,34.2l0-0.9c0,0-5.5,0.4-7.7,0c-2.1-0.4-1.9-8.8-1.9-8.8s9.1,0,11,0s4.9,5.8,4.9,5.8l7.8,10.5
       l0.3-0.6c0-5.2,4.2-9.4,9.4-9.4h13.5c5.7,0,10.3,4.6,10.3,10.3l0,0.9l9-11.5c0,0,3-5.8,4.9-5.8s11,0,11,0s0.2,8.4-1.9,8.8
       c-2.1,0.4-7.7,0-7.7,0l0,0.9L70.5,50.8"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    TradeUnspsc: {
        image: <>
            <g>
                <path class="st-0" d="M37.9,91.7H27.5c-0.2,0-0.4-0.2-0.4-0.4V65.2c0-0.2,0.2-0.4,0.4-0.4h10.4c0.2,0,0.4,0.2,0.4,0.4v26.2
           C38.3,91.6,38.1,91.7,37.9,91.7z"/>
                <path class="st-0" d="M18.3,91.7H8.2c-0.2,0-0.4-0.2-0.4-0.4V76.7c0-0.2,0.2-0.4,0.4-0.4h10.1c0.2,0,0.4,0.2,0.4,0.4v14.7
           C18.7,91.6,18.5,91.7,18.3,91.7z"/>
                <path class="st-0" d="M18.3,68.4H8.2c-0.2,0-0.4-0.2-0.4-0.4V54.7c0-0.2,0.2-0.4,0.4-0.4h10.1c0.2,0,0.4,0.2,0.4,0.4V68
           C18.7,68.2,18.5,68.4,18.3,68.4z"/>
                <path class="st-0" d="M91.8,91.7h-9.7c-0.2,0-0.4-0.2-0.4-0.4V76.7c0-0.2,0.2-0.4,0.4-0.4h9.7c0.2,0,0.4,0.2,0.4,0.4v14.7
           C92.2,91.6,92.1,91.7,91.8,91.7z"/>
                <path class="st-0" d="M91.8,69.1h-9.7c-0.2,0-0.4-0.2-0.4-0.4V55.5c0-0.2,0.2-0.4,0.4-0.4h9.7c0.2,0,0.4,0.2,0.4,0.4v13.3
           C92.2,69,92.1,69.1,91.8,69.1z"/>
                <path class="st-0" d="M73,91.7h-8.5c-0.2,0-0.4-0.2-0.4-0.4V79.1c0-0.2,0.2-0.4,0.4-0.4H73c0.2,0,0.4,0.2,0.4,0.4v12.3
           C73.4,91.6,73.2,91.7,73,91.7z"/>
                <path class="st-0" d="M69.6,71.5H68c-2.1,0-3.8-1.7-3.8-3.8v-5.4c0-2.1,1.7-3.8,3.8-3.8h1.6c2.1,0,3.8,1.7,3.8,3.8v5.4
           C73.4,69.8,71.7,71.5,69.6,71.5z"/>
                <path class="st-0" d="M56.7,91.7H46.5c-0.2,0-0.4-0.2-0.4-0.4V62.7c0-0.2,0.2-0.4,0.4-0.4h10.1c0.2,0,0.4,0.2,0.4,0.4v28.6
           C57.1,91.6,56.9,91.7,56.7,91.7z"/>
                <ellipse class="st-0" cx="48.7" cy="17.8" rx="8.1" ry="9.5" />
                <path class="st-0" d="M28.1,50.7L17.5,34.1l0-0.9c0,0-5.5,0.4-7.7,0C7.7,32.9,8,24.5,8,24.5s9.1,0,11,0s4.9,5.8,4.9,5.8l7.8,10.5
           l0.3-0.6c0-5.2,4.2-9.4,9.4-9.4h13.5c5.7,0,10.3,4.6,10.3,10.3l0,0.9l9-11.5c0,0,3-5.8,4.9-5.8s11,0,11,0s0.2,8.4-1.9,8.8
           c-2.1,0.4-7.7,0-7.7,0l0,0.9L69.9,50.7"/>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    TradeSeller: {
        image: <>
            <path class="st-0" d="M56.8,89" />
            <path class="st-1" d="M50.4,91.5" />
            <path class="st-2" d="M93.9,82H6.7c-0.2,0-0.4-0.2-0.4-0.4v-5.7c0-0.2,0.2-0.4,0.4-0.4h87.2c0.2,0,0.4,0.2,0.4,0.4v5.7
       C94.3,81.8,94.1,82,93.9,82z"/>
            <g>
                <path class="st-2" d="M27.5,74.4H16.8c-0.2,0-0.4-0.2-0.4-0.4V59.9c0-0.2,0.2-0.4,0.4-0.4h10.8c0.2,0,0.4,0.2,0.4,0.4V74
           C27.9,74.2,27.7,74.4,27.5,74.4z"/>
                <path class="st-2" d="M41.6,74.4H30.9c-0.2,0-0.4-0.2-0.4-0.4V59.9c0-0.2,0.2-0.4,0.4-0.4h10.8c0.2,0,0.4,0.2,0.4,0.4V74
           C42,74.2,41.8,74.4,41.6,74.4z"/>
                <path class="st-2" d="M55.7,74.4H45c-0.2,0-0.4-0.2-0.4-0.4V59.9c0-0.2,0.2-0.4,0.4-0.4h10.8c0.2,0,0.4,0.2,0.4,0.4V74
           C56.1,74.2,55.9,74.4,55.7,74.4z"/>
                <path class="st-2" d="M69.8,74.4H59.1c-0.2,0-0.4-0.2-0.4-0.4V59.9c0-0.2,0.2-0.4,0.4-0.4h10.8c0.2,0,0.4,0.2,0.4,0.4V74
           C70.2,74.2,70,74.4,69.8,74.4z"/>
                <path class="st-2" d="M83.9,74.4H73.2c-0.2,0-0.4-0.2-0.4-0.4V59.9c0-0.2,0.2-0.4,0.4-0.4h10.8c0.2,0,0.4,0.2,0.4,0.4V74
           C84.3,74.2,84.1,74.4,83.9,74.4z"/>
            </g>
            <g>
                <path class="st-2" d="M65.7,55.6l-2-6.8l0-2.7h12.6c2.7,0,4.9-2.1,4.9-4.8v0c0-2.6-2.2-4.8-4.9-4.8H63.2h-3.5H24.3
           c-2.7,0-4.9,2.1-4.9,4.8v0c0,2.6,2.2,4.8,4.9,4.8H38L37.8,48l-2.5,7.6"/>
                <g>
                    <g>
                        <g>
                            <ellipse class="st-2" cx="50.9" cy="24.2" rx="9.3" ry="10.5" />
                        </g>
                    </g>
                </g>
                <polyline class="st-2" points="49.7,40.4 47.2,58.4 50.9,62.4 54.7,58.8 52.6,40.4 	" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    TradeNace: {
        image: <>

            <path class="st-0" d="M56.8,89" />
            <path class="st-1" d="M50.4,91.5" />
            <g>
                <path class="st-2" d="M10.6,86.6V53.7c-0.2-4.8,1.1-7.3,5.5-9.1l13.1-4.8l0.2-2.4v-4.4l17.4-1.3v2.9l0.2,4.1l14.8,5.6
           c0,0,3.5,1,3.5,8s0,22.5,0,22.5"/>
                <path class="st-2" d="M26.3,41.3l5.5,8.7c0.2,0.4,12,0.7,12.2,0.4l6.2-9.7" />
                <path class="st-2" d="M50.1,21.3c0,8.1-5.4,14.8-12.7,14.8c-7.3,0-12.7-6.7-12.7-14.8S27.5,5,37.8,5C49.3,5,50.1,13.1,50.1,21.3z" />
                <path class="st-2" d="M25,19.1c4.3-0.7,6.9-5.6,6.9-5.6s2.9,6,6.7,4.6c10.2-3.6,10.4,3.3,10.4,3.3" />
                <path class="st-2" d="M33.5,30.3h8.4" />
                <path class="st-2" d="M87.6,71.9v19.6c0,1.9-1.6,3.5-3.5,3.5H44.3c-1.9,0-3.5-1.6-3.5-3.5V71.9 M46.3,75.5c-4.7-2.2-7.4-5-7.4-7.9
           v-5c0-2.1,1.7-3.7,3.8-3.7h43c2.1,0,3.8,1.7,3.8,3.7v5c0,2.9-2.7,5.7-7.4,7.9 M72.1,78L57,78.4 M56.9,58.7v-3.7
           c0-1.1,0.8-1.9,1.9-1.9h10.8c1.1,0,1.9,0.8,1.9,1.9v3.7H56.9z M78.7,76.8v3.7c0,1.1-0.8,1.9-1.9,1.9c-1.1,0-1.9-0.8-1.9-1.9v-3.7
           H78.7z M49.7,80.6v-3.7h3.9v3.7c0,1.1-0.8,1.9-1.9,1.9C50.6,82.5,49.7,81.7,49.7,80.6z"/>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    TradeInstructor: {
        image: <>
            <path class="st-0" d="M86.9,52.1H33.1L33,37.5V22.4h-1.4c-0.7,0-1.4-0.6-1.4-1.4v-5.4c0-0.7,0.6-1.4,1.4-1.4h56.8
       c0.7,0,1.4,0.6,1.4,1.4v5.4c0,0.7-0.6,1.4-1.4,1.4H87v6.4L86.9,52.1z"/>
            <path class="st-1" d="M24.1,84.2" />
            <path class="st-0" d="M17.6,40.2L17.6,40.2c-4.4,0-7.9,3.5-7.9,7.9v7.1c0,0.9,0.7,1.6,1.6,1.6H16v27l-0.9,4.3
       c-0.5,0.7-0.3,1.7,0.4,2.2c0.3,0.2,0.6,0.3,0.9,0.3H22l0.3-3v-22h3.1v22l-0.1,3h7c0.9,0,1.6-0.7,1.6-1.6c0-0.3-0.1-0.6-0.3-0.9
       l-1.9-4.3v-29l0.4,0.8c1.6,3.2,5.4,4.5,8.6,2.9c1.4-0.7,2.5-1.9,3.1-3.4l2.6-6.4l2.5-6.3c0.3-0.8-0.1-1.7-0.9-2c-0.2-0.1,0-3-0.2-3
       l-3.9,2.9c-0.7,0-4.9,10.2-5.1,10.8L38,45.8L38,45.7c-1.2-3.3-4.3-5.5-7.8-5.5h0H17.6"/>
            <path class="st-0" d="M17.7,29.7c0-2.8,2.4-5.1,5.4-5.1s5.4,2.3,5.4,5.1v3.4c0,2.8-2.4,5.1-5.4,5.1s-5.4-2.3-5.4-5.1V29.7z" />
            <polyline class="st-2" points="22.5,50.7 22.8,55.2 16,56.8 " />
            <polyline class="st-2" points="70.1,83.4 61.3,78.4 61.3,52.8 " />
            <line class="st-0" x1="59.9" y1="78.4" x2="59.9" y2="85.1" />
            <polyline class="st-2" points="58.6,52.8 58.6,78.4 49.8,83.4 " />
            <line class="st-0" x1="35.7" y1="22.4" x2="84.3" y2="22.4" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    TradeErp: {
        image: <>
            <g>
                <path class="st-0" d="M67.4,45.5h-3.5c-0.6,0-1-0.3-1.2-0.8c-0.2-0.5-0.1-1.1,0.3-1.5l2.5-2.5c0.4-0.4,0.6-0.8,0.6-1.4
           c0-0.5-0.2-1-0.6-1.4l-3.1-3.1c-0.7-0.7-2-0.7-2.7,0l-2.5,2.5c-0.4,0.4-0.9,0.5-1.5,0.3c-0.5-0.2-0.8-0.7-0.8-1.2v-3.5
           c0-1.1-0.9-1.9-1.9-1.9h-4.4c-1.1,0-1.9,0.9-1.9,1.9v3.5c0,0.6-0.3,1-0.8,1.2c-0.5,0.2-1.1,0.1-1.5-0.3l-2.5-2.5
           c-0.7-0.7-2-0.7-2.7,0L36,38c-0.4,0.4-0.6,0.8-0.6,1.4c0,0.5,0.2,1,0.6,1.4l2.5,2.5c0.4,0.4,0.5,0.9,0.3,1.5s-0.7,0.8-1.2,0.8H34
           c-1.1,0-1.9,0.9-1.9,1.9v4.4c0,1.1,0.9,1.9,1.9,1.9h3.5c0.6,0,1,0.3,1.2,0.8s0.1,1.1-0.3,1.5L36,58.5c-0.4,0.4-0.6,0.8-0.6,1.4
           c0,0.5,0.2,1,0.6,1.4l3.1,3.1c0.7,0.7,2,0.7,2.7,0l2.5-2.5c0.4-0.4,0.9-0.5,1.5-0.3c0.5,0.2,0.8,0.7,0.8,1.2v3.5
           c0,1.1,0.9,1.9,1.9,1.9h4.4c1.1,0,1.9-0.9,1.9-1.9v-3.5c0-0.6,0.3-1,0.8-1.2c0.5-0.2,1.1-0.1,1.5,0.3l2.5,2.5c0.7,0.7,2,0.7,2.7,0
           l3.1-3.1c0.4-0.4,0.6-0.8,0.6-1.4c0-0.5-0.2-1-0.6-1.4L63,56c-0.4-0.4-0.5-0.9-0.3-1.5s0.7-0.8,1.2-0.8h3.5c1.1,0,1.9-0.9,1.9-1.9
           v-4.4C69.3,46.3,68.5,45.5,67.4,45.5z"/>
            </g>
            <path class="st-0" d="M46.6,54h-5.3v-8.5h5.3 M41.7,49.5h4.2" />
            <path class="st-0" d="M48.2,54v-8.5h2.4c0.5,0,1,0.1,1.4,0.2c0.4,0.1,0.7,0.3,1,0.5c0.3,0.2,0.4,0.5,0.6,0.7c0.1,0.3,0.2,0.6,0.2,1
       c0,0.3,0,0.6-0.1,0.8c-0.1,0.3-0.2,0.5-0.4,0.7c-0.2,0.2-0.4,0.4-0.7,0.5c-0.3,0.1-0.6,0.3-0.9,0.3c0.1,0.1,0.3,0.2,0.4,0.4l2.5,3.4
       "/>
            <path class="st-0" d="M55.7,54v-8.5h2.5c0.5,0,1,0.1,1.4,0.2c0.4,0.1,0.7,0.3,1,0.5c0.3,0.2,0.5,0.5,0.6,0.8c0.1,0.3,0.2,0.7,0.2,1.1
       c0,0.4-0.1,0.8-0.2,1.1c-0.1,0.3-0.3,0.6-0.6,0.9c-0.3,0.2-0.6,0.4-1,0.6c-0.4,0.1-0.9,0.2-1.4,0.2h-1.4"/>
            <circle class="st-0" cx="83.5" cy="50.2" r="11.6" />
            <circle class="st-0" cx="66.5" cy="82.3" r="11.6" />
            <circle class="st-0" cx="33.1" cy="82.3" r="11.6" />
            <circle class="st-0" cx="17.3" cy="49.9" r="11.6" />
            <circle class="st-0" cx="33.9" cy="17.4" r="11.6" />
            <circle class="st-0" cx="67.2" cy="17.4" r="11.6" />
            <line class="st-0" x1="56.6" y1="61.8" x2="61.4" y2="72" />
            <line class="st-0" x1="39.5" y1="27.4" x2="43.1" y2="35.8" />
            <line class="st-0" x1="58.4" y1="35.8" x2="62.4" y2="28.2" />
            <line class="st-0" x1="39" y1="72.2" x2="44.9" y2="61.5" />
            <line class="st-0" x1="69.4" y1="49.9" x2="71.9" y2="49.9" />
            <line class="st-0" x1="28.9" y1="49.9" x2="32.1" y2="49.9" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    TradeCPV: {
        image: <>
            <g>
                <path class="st-0" d="M92.3,33.3c0-15.9-12.9-28.8-28.8-28.8c-6.5,0-12.7,2.1-17.8,6.1c-1.2,0.9-2.3,1.9-3.3,3
           c-1.5,1.6-2.8,3.4-3.9,5.3c-2.5,4.3-3.8,9.3-3.8,14.3"/>
                <path class="st-0" d="M53.5,38.8c0,4.7,2.9,8.7,6.7,9.8c0.1,1.4,1.3,2.6,2.7,2.6c1.5,0,2.7-1.2,2.7-2.7c3.9-1,7.3-4,7.3-9.1
           c0-6.1-6.3-9.5-9.5-9.5"/>
                <path class="st-0" d="M71.8,26c0-1.7,0-3.7-2-5.7c-1.2-1.2-2.6-2-4.1-2.5c-0.1-1.4-1.3-2.6-2.7-2.6c-1.5,0-2.7,1.2-2.7,2.7v0.2
           c-3,1.1-6.2,3.8-6.2,8.8c0,6.2,6.5,8.4,9.5,8.4"/>
            </g>
            <path class="st-0" d="M42.5,93.1l1.6,1.5c0.5,0.5,1.4,0.5,1.9,0l15.4-15.3l0.4-0.6c0.5-0.5,0.5-1.4,0-1.9L45.4,60.4L28,58.6" />
            <path class="st-0" d="M42.9,58.2c-2.1-2.1-5.7-2.3-7.8-0.3H22.8V78l4.3,0.8" />
            <path class="st-0" d="M36.7,73.5c-1.2-1.2-3.2-1.2-4.4,0l-5.9,5.9l-0.1,1.7l15.8,16c0.5,0.5,1.4,0.5,1.9,0l5.9-5.9
       c1.2-1.2,1.2-3.2,0-4.4L37.1,74.1L36.7,73.5z"/>
            <path class="st-0" d="M70.4,57.9H56.9l-0.8-0.8c-0.3-0.3-0.5-0.5-0.9-0.7l0,0l-1-1c-2.4-2.4-6.2-2.4-8.5,0L35,66.1
       c-0.8,0.8-0.8,2.1,0,2.9c2.1,2.1,5.6,2.1,7.7,0l5.5-5.5l14.7,14.7h7.4"/>
            <path class="st-0" d="M86.2,83.6H71.7c-0.8,0-1.4-0.6-1.4-1.4V55.1c0-0.8,0.6-1.4,1.4-1.4h21.1" />
            <path class="st-0" d="M7.6,83.6h14.2c0.6,0,1-0.6,1-1.4V55.1c0-0.8-0.4-1.4-1-1.4H4.7" />
            <path class="st-0" d="M44.6,77.8" />
            <path class="st-1" d="M56.8,89" />
            <path class="st-2" d="M50.4,91.5" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    TechnicalConfig: {
        image: <>
            <g>
                <g>
                    <path class="st-0" d="M87.7,61.8h-4.9c-0.8,0-1.4-0.4-1.7-1.2c-0.3-0.7-0.1-1.5,0.4-2.1l3.5-3.5c0.5-0.5,0.8-1.2,0.8-1.9
               c0-0.7-0.3-1.4-0.8-1.9l-4.4-4.4c-1-1-2.8-1-3.8,0l-3.5,3.5c-0.6,0.6-1.3,0.7-2.1,0.4c-0.7-0.3-1.2-1-1.2-1.7v-4.9
               c0-1.5-1.2-2.7-2.7-2.7h-6.3c-1.5,0-2.7,1.2-2.7,2.7v4.9c0,0.8-0.4,1.4-1.2,1.7c-0.7,0.3-1.5,0.1-2.1-0.4l-3.5-3.5
               c-1-1-2.8-1-3.8,0l-4.4,4.4c-0.5,0.5-0.8,1.2-0.8,1.9c0,0.7,0.3,1.4,0.8,1.9l3.5,3.5c0.6,0.6,0.7,1.3,0.4,2.1
               c-0.3,0.7-1,1.2-1.7,1.2h-4.9c-1.5,0-2.7,1.2-2.7,2.7v6.2c0,1.5,1.2,2.7,2.7,2.7h4.9c0.8,0,1.4,0.4,1.7,1.2
               c0.3,0.7,0.1,1.5-0.4,2.1l-3.5,3.5c-0.5,0.5-0.8,1.2-0.8,1.9c0,0.7,0.3,1.4,0.8,1.9l4.4,4.4c1,1,2.8,1,3.8,0l3.5-3.5
               c0.6-0.6,1.3-0.7,2.1-0.4c0.7,0.3,1.2,1,1.2,1.7v4.9c0,1.5,1.2,2.7,2.7,2.7h6.2c1.5,0,2.7-1.2,2.7-2.7v-4.9c0-0.8,0.4-1.4,1.2-1.7
               c0.7-0.3,1.5-0.1,2.1,0.4l3.5,3.5c1,1,2.8,1,3.8,0L85,84c0.5-0.5,0.8-1.2,0.8-1.9c0-0.7-0.3-1.4-0.8-1.9l-3.5-3.5
               c-0.6-0.6-0.7-1.3-0.4-2.1c0.3-0.7,1-1.2,1.7-1.2h4.9c1.5,0,2.7-1.2,2.7-2.7v-6.3C90.4,63.1,89.2,61.8,87.7,61.8z"/>
                    <path class="st-0" d="M64.2,58.9c-4.8,0-8.7,3.9-8.7,8.7c0,4.8,3.9,8.7,8.7,8.7s8.7-3.9,8.7-8.7C73,62.9,69.1,58.9,64.2,58.9z" />
                </g>
                <path class="st-0" d="M11.3,63.3l3.3,2.8c1.3,1.1,3.2,0.9,4.3-0.4c0.3-0.4,0.5-0.8,0.6-1.3c1.1,0.3,2.4-0.1,3.1-1
           c0.4-0.5,0.6-1.1,0.7-1.7c0.9,0,1.9-0.4,2.5-1.1c0.6-0.7,0.8-1.6,0.7-2.5c0.7-0.2,1.2-0.5,1.7-1c0.5-0.6,0.8-1.4,0.7-2.2
           c-0.1-0.8-0.5-1.6-1.1-2.1l-1-0.8c0,0,5.6,1.6,5.4-2.2c-0.2-3.2-2.1-0.7-8.1-4.2c-3.7-2.2-7-1.2-7-1.2C11.3,44.9,6.9,50.1,7.4,56
           C7.7,58.9,9.1,61.4,11.3,63.3z"/>
                <line class="st-0" x1="19.6" y1="64.4" x2="14.6" y2="59.9" />
                <line class="st-0" x1="23.4" y1="61.7" x2="18.9" y2="57.5" />
                <line class="st-0" x1="26.5" y1="58.1" x2="21.7" y2="53.9" />
                <line class="st-0" x1="26.9" y1="52" x2="23.2" y2="49.4" />
                <g>
                    <path class="st-0" d="M61.5,7.6c0.7,0.5,8,5.6,9.9,7.6l4.9,5.5c1.2,1.3,1,3-0.4,3.8c-0.4,0.2-0.8,0.3-1.2,0.4
               c0.4,1.1,0.1,2.2-1,2.8c-0.4,0.2-0.8,0.4-1.3,0.4c0.3,1-0.6,2.3-1.6,2.9c-0.3,0.2-0.6,0.3-0.9,0.3l2.4,2.6c1.2,1.3,1,3-0.4,3.8
               c-1.4,0.8-3.5,0.4-4.7-0.9l-8.5-9.4l-0.1,3c0,0,0,0,0,0.1c-0.1,0.7-0.5,1.3-1.2,1.7c0,0,0,0,0,0c-0.7,0.4-1.5,0.5-2.4,0.3
               c-1.5-0.3-2.6-1.4-3-3.1c-0.5-2.2-0.8-4.3-1-6.2c-0.2-1.4-0.4-2.7-0.6-3.7c-0.2-0.9-1.1-5.1-1.1-5.1"/>
                    <line class="st-0" x1="69.7" y1="31.2" x2="64" y2="24.9" />
                    <line class="st-0" x1="72.3" y1="28.1" x2="67" y2="22.2" />
                    <line class="st-0" x1="74.8" y1="25" x2="69.7" y2="19.4" />
                </g>
                <path class="st-0" d="M39.9,77.8H21c-7.5,0-13.6-6.1-13.6-13.6" />
                <path class="st-0" d="M76.6,21c7.5,0,13.6,6.1,13.6,13.6v20.9" />
                <path class="st-0" d="M6.8,47.3C6.8,37.2,14.6,29,24.1,29c2.9,0,5.1,0,8.1,0" />
                <ellipse class="st-0" cx="28.3" cy="16.9" rx="8.4" ry="9.8" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Team: {
        image: <>
            <g>
                <path class="st-0" d="M6.1,61.4c0-7.7,6.3-14,14-14s14,6.3,14,14 M20.8,46.2c-4.2,0-7.7-3.4-7.7-7.7s3.4-7.7,7.7-7.7
           s7.7,3.4,7.7,7.7S25,46.2,20.8,46.2z"/>
            </g>
            <g>
                <path class="st-0" d="M35.7,36.2c0-7.7,6.3-14,14-14s14,6.3,14,14 M50.4,21c-4.2,0-7.7-3.4-7.7-7.7s3.4-7.7,7.7-7.7S58,9.1,58,13.3
           S54.6,21,50.4,21z"/>
            </g>
            <g>
                <path class="st-0" d="M35.7,92.5c0-7.7,6.3-14,14-14s14,6.3,14,14 M50.4,77.3c-4.2,0-7.7-3.4-7.7-7.7s3.4-7.7,7.7-7.7
           s7.7,3.4,7.7,7.7S54.6,77.3,50.4,77.3z"/>
            </g>
            <g>
                <path class="st-0" d="M66.3,71.4c0-7.7,6.3-14,14-14s14,6.3,14,14 M80.9,56.2c-4.2,0-7.7-3.4-7.7-7.7s3.4-7.7,7.7-7.7
           c4.2,0,7.7,3.4,7.7,7.7S85.2,56.2,80.9,56.2z"/>
            </g>
            <path class="st-1" d="M30.1,84.2h-8.3c-8.6,0-15.6-7-15.6-15.6" />
            <path class="st-1" d="M64,19.1h8.3c8.6,0,15.6,7,15.6,15.6" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Teaching: {
        image: <>
            <g>
                <g>
                    <path class="st-0" d="M30.2,91.7v-3.7c0-2,1.7-3.7,3.7-3.7h7.4c2,0,3.7,1.7,3.7,3.7v3.7h2.5v-3.7c0-2,1.7-3.7,3.7-3.7h7.4
               c2,0,3.7,1.7,3.7,3.7v3.7h2.5v-3.7c0-2,1.7-3.7,3.7-3.7H76c2,0,3.7,1.7,3.7,3.7 M41.4,78.1c0,2-1.7,3.7-3.7,3.7
               c-2,0-3.7-1.7-3.7-3.7v-2.5c0-2,1.7-3.7,3.7-3.7c2,0,3.7,1.7,3.7,3.7V78.1z M58.7,78.1c0,2-1.7,3.7-3.7,3.7c-2,0-3.7-1.7-3.7-3.7
               v-2.5c0-2,1.7-3.7,3.7-3.7c2,0,3.7,1.7,3.7,3.7V78.1z M76,78.1c0,2-1.7,3.7-3.7,3.7s-3.7-1.7-3.7-3.7v-2.5c0-2,1.7-3.7,3.7-3.7
               s3.7,1.7,3.7,3.7V78.1z"/>
                </g>
            </g>
            <path class="st-0" d="M22.2,79.8h5.5c0.7,0,1.2-0.6,1.2-1.2c0-0.2-0.1-0.5-0.2-0.7l-1.5-3.4V51.6l0.3,0.6c1.2,2.5,4.3,3.5,6.8,2.3
       c1.1-0.6,2-1.5,2.4-2.6l2-5l2-4.9c0.3-0.6-0.1-1.4-0.7-1.6c-0.1-0.1,0-2.3-0.1-2.3l-3.1,2.2c-0.5,0-3.9,8-4,8.5l-0.6-4.1l0-0.1
       c-0.9-2.6-3.4-4.3-6.1-4.3h0"/>
            <path class="st-0" d="M16.1,40.2L16.1,40.2c-3.4,0-6.2,2.8-6.2,6.2V52c0,0.7,0.6,1.2,1.2,1.2h3.7v21.2l-0.7,3.4
       c-0.4,0.6-0.2,1.3,0.3,1.7c0.2,0.1,0.4,0.2,0.7,0.2h4.4"/>
            <path class="st-0" d="M16.2,32c0-2.2,1.9-4,4.3-4s4.3,1.8,4.3,4v2.7c0,2.2-1.9,4-4.3,4s-4.3-1.8-4.3-4V32z" />
            <polyline class="st-0" points="20,48.5 20.2,52 14.9,53.2 " />
            <path class="st-0" d="M17.3,74.8" />
            <polyline class="st-0" points="22.3,79.8 22.3,62.5 19.8,62.5 19.8,79.8 " />
            <g>
                <g>
                    <path class="st-0" d="M64.2,64.6l-8-4.6v-5.5h26v-2.5h-2.5V24.9h1.2c0.7,0,1.2-0.6,1.2-1.2v-4.9c0-0.7-0.6-1.2-1.2-1.2H29
               c-0.7,0-1.2,0.6-1.2,1.2v4.9c0,0.7,0.6,1.2,1.2,1.2h1.2v16.8 M54.9,61.3v4.8 M34.5,54.6h19.2V60l-8,4.6 M77.2,52.1H36.9
                M32.7,24.9h44.5"/>
                </g>
            </g>
            <path class="st-0" d="M10.5,73.4c-3.9-6.7-6.1-14.5-6.1-22.8C4.4,25.4,24.8,5,50,5c10.4,0,20,3.5,27.7,9.4" />
            <path class="st-0" d="M24.9,88.7c-2.3-1.5-4.4-3.2-6.3-5" />
            <path class="st-0" d="M64.1,94c-4.4,1.4-9.2,2.2-14.1,2.2c-5.3,0-10.4-0.9-15.2-2.6" />
            <path class="st-0" d="M85.1,21.5c6.5,7.9,10.5,18,10.5,29.1c0,12.9-5.4,24.6-14,32.9" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    TaskList: {
        image: <>
            <g>
                <path class="st-0" d="M25.4,73.8v17.7c0,0.9,0.7,1.6,1.6,1.6h56.7c0.9,0,1.6-0.7,1.6-1.6V9.7c0-0.9-0.7-1.6-1.6-1.6L27,8.1
           c-0.9,0-1.6,0.7-1.6,1.6v29.9"/>
                <path class="st-0" d="M34.7,30.2l3.1,3.1c0.3,0.3,0.7,0.5,1.1,0.5c0,0,0.1,0,0.1,0c0.5,0,0.9-0.3,1.1-0.6l4.7-6.3" />
                <path class="st-0" d="M34.7,46.2l3.1,3.1c0.3,0.3,0.7,0.5,1.1,0.5c0,0,0.1,0,0.1,0c0.5,0,0.9-0.3,1.1-0.6l4.7-6.3" />
                <path class="st-0" d="M78,30.1H53.8" />
                <path class="st-0" d="M78,46.8H53.8" />
                <path class="st-0" d="M78,63.5H53.8" />
                <path class="st-0" d="M78,80.2H53.8" />
                <path class="st-0" d="M32.6,69.7l1.1,1.1c0.4,0.4,1,0.6,1.5,0.4c0.5-0.1,1-0.6,1.1-1.1c0.1-0.5,0-1.1-0.4-1.5l-1.1-1.1
           c0-3.1-1.2-6-3.3-8.2L17.9,44.4c-0.8-0.9-2-1.5-3.2-1.5c-0.1,0-0.2,0-0.3,0h0c-1,0-2,0.3-2.8,0.8c-0.3,0.2-0.5,0.4-0.8,0.6
           c-1.9,1.9-1.9,4.9-0.1,6.8l2.4,2.6l0,0l11.2,12.1C26.4,68.1,29.4,69.5,32.6,69.7z"/>
                <line class="st-0" x1="33.9" y1="6.1" x2="33.9" y2="14.4" />
                <line class="st-0" x1="55.4" y1="6.1" x2="55.4" y2="14.4" />
                <line class="st-0" x1="78" y1="6.1" x2="78" y2="14.4" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    TabChart: {
        image: <>
            <g>
                <path class="st-0" d="M61,32.1V17c0-2.7-2.2-4.8-4.8-4.8H16.5c-2.7,0-4.8,2.2-4.8,4.8v66.9c0,2.7,2.2,4.8,4.8,4.8h39.6
           c2.7,0,4.8-2.2,4.8-4.8V67.9 M12.2,76.2h48.7"/>
                <path class="st-0" d="M36.4,84C35.1,84,34,83,34,81.7c0-1.3,1.1-2.4,2.4-2.4s2.4,1.1,2.4,2.4C38.7,83,37.7,84,36.4,84z" />
                <path class="st-0" d="M94.6,47.1c0,10.3-9.4,18.6-20.9,18.6c-1.7,0-3.3-0.2-4.8-0.5c-2.1-0.4-9.7,3.7-11.6,2.8
           c-2.1-1.1,1.6-7.5,0-9.3c-2.8-3.2-4.6-7.2-4.6-11.6c0-10.3,9.4-18.6,20.9-18.6S94.6,36.8,94.6,47.1z"/>
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Supervisor: {
        image: <>
            <g>
                <g>
                    <g>
                        <ellipse class="st-0" cx="51.7" cy="16" rx="10.4" ry="11.9" />
                    </g>
                </g>
            </g>
            <polyline class="st-0" points="50,31.2 46.9,54.5 51.6,59.7 56.2,55 53.6,31.2 " />
            <path class="st-0" d="M35.5,42H18.4c-3.4,0-6.2-2.8-6.2-6.2v0c0-3.4,2.8-6.2,6.2-6.2h44.4" />
            <path class="st-0" d="M63,29.6h20.6c3.4,0,6.2,2.8,6.2,6.2v0c0,3.4-2.8,6.2-6.2,6.2H67.8" />
            <line class="st-0" x1="35.6" y1="42.1" x2="32.2" y2="54.2" />
            <line class="st-0" x1="67.8" y1="42" x2="70.3" y2="54.2" />
            <circle class="st-1" cx="85" cy="65.1" r="12.1" />
            <circle class="st-1" cx="51.3" cy="81.6" r="12.1" />
            <circle class="st-1" cx="17.2" cy="64.4" r="12.1" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    SpeedDelivery: {
        image: <>
            <path class="st-0" d="M39.7,26.3h19.1v4.1l0.5,1.2h15.8L92.4,53v16.8l-2.3,4.2h-2.5h-2.1c0,0-4.9-8.8-8.4-8.8
       c-3.5,0-10.2,8.7-10.2,8.7H44.6c0,0-8.4-9-9.5-8.9c-1.1,0.1-9.5,8.8-9.5,8.8h-4.3"/>
            <path class="st-1" d="M18.1,26.3h40.6v4.1l0.5,1.2h15.8L92.4,53v16.8l-2.3,4.2h-2.5h-2.1" />
            <path class="st-2" d="M35.1,83.1c5,0,9-4,9-9c0-5-4-9-9-9c-5,0-9,4-9,9C26.1,79,30.1,83.1,35.1,83.1z" />
            <path class="st-2" d="M76.4,83.1c5,0,9-4,9-9c0-5-4-9-9-9c-5,0-9,4-9,9C67.5,79,71.5,83.1,76.4,83.1z" />
            <path class="st-2" d="M20,74.2h6" />
            <path class="st-2" d="M44.1,74.1h23.3" />
            <path class="st-2" d="M59.3,33.2v11.9l2,2l26.1,0.1" />
            <path class="st-2" d="M14.7,35.9h26.7" />
            <path class="st-2" d="M4.4,44.8h34.4" />
            <path class="st-2" d="M8.5,54.2h27" />
            <path class="st-2" d="M11.4,62.6h24.5" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    ShipLoading2: {
        image: <>
            <g>
                <circle class="st-0" cx="269.1" cy="882.5" r="41.2" />
                <g>
                    <path class="st-0" d="M276.9,898.1v-31.8 M291,898.1v-23.4c0-0.4-0.3-0.7-0.8-0.7h-13.3v-10.4c0-0.4-0.3-0.7-0.8-0.7h-23.7
                    c-0.5,0-0.8,0.2-0.8,0.7v34.4"/>
                    <line class="st-0" x1="257.2" y1="871" x2="272" y2="871" />
                    <line class="st-0" x1="257.2" y1="877.5" x2="272" y2="877.5" />
                    <line class="st-0" x1="257.2" y1="884.1" x2="272" y2="884.1" />
                    <line class="st-0" x1="257.2" y1="891.2" x2="272" y2="891.2" />
                    <line class="st-0" x1="257.2" y1="896.9" x2="272" y2="896.9" />
                </g>
            </g>
            <path class="st-1" d="M14.7,35.1h12.6v2.1l0.3,0.6h8l8.8,10.8v8.5l-1.2,2.1h-1.3h-1.1c0,0-2.5-4.4-4.2-4.4c-1.8,0-5.2,4.4-5.2,4.4
            H20.2c0,0-4.3-4.5-4.8-4.5c-0.5,0-4.8,4.4-4.8,4.4H6.4"/>
            <circle class="st-0" cx="16.5" cy="59" r="4.4" />
            <circle class="st-0" cx="36.8" cy="59" r="4.4" />
            <line class="st-0" x1="6.5" y1="58.8" x2="12.1" y2="58.8" />
            <line class="st-0" x1="20.9" y1="59" x2="32.4" y2="59" />
            <polyline class="st-2" points="41.2,59 43.4,59 44.6,56.9 44.6,48.7 36.1,38.2 28.4,38.2 28.4,44.8 29.4,45.8 42.1,45.9 " />
            <polyline class="st-2" points="8.2,35.6 28.1,35.6 28.1,37.6 " />
            <line class="st-0" x1="6.6" y1="40.3" x2="19.6" y2="40.3" />
            <line class="st-0" x1="8.3" y1="44.7" x2="18.4" y2="44.7" />
            <line class="st-0" x1="3.5" y1="49.3" x2="16.7" y2="49.3" />
            <line class="st-0" x1="4.9" y1="53.4" x2="10.2" y2="53.4" />
            <path class="st-0" d="M55.3,77.9c-1.5-5-3.8-12.6-5.2-17.5c-0.2-0.7,0.1-2.1,0.6-2.5c2-1.5,4.3-2.6,6.4-3.9c3.6-2.2,9.4-7.3,13-9.5
            c0,0,11,7.6,14.6,9.8c2.1,1.3,4.3,2.5,6.4,3.9c0.5,0.3,1.1,1.4,0.9,1.9c-1.7,5.7-3.6,11.3-5.4,16.9"/>
            <path class="st-0" d="M69.8,44c0,9,0,23.4,0,32.4" />
            <path class="st-0" d="M95.4,74.4c-1.1,0.7-2.2,1.2-3.3,2c-2,1.5-4.3,1.3-6.2,0.2c-2.8-1.7-5.2-1.6-8,0c-2.7,1.6-5.5,1.7-8.6-0.2
            c-2.6-1.6-5.6-1.7-8.5,0.2c-1.8,1.1-4.2,1.9-6.2,0.7c-3.8-2.2-7-1.6-10.2,1"/>
            <path class="st-0" d="M75.2,81.1c-2,1.5-4.3,1.3-6.2,0.2c-2.8-1.7-5.2-1.6-8,0c-2.7,1.6-5.5,1.7-8.6-0.2c-2.6-1.6-5.6-1.7-8.5,0.2" />
            <path class="st-0" d="M84.3,59.2c-2.1-2.2-4.4-4.1-7.6-4.6" />
            <polyline class="st-2" points="58.4,35 58.4,26 21.3,26 21.3,34.8 " />
            <polyline class="st-2" points="55,31.4 58.5,35 62,31.4 " />
            <polyline class="st-2" points="78.9,26.5 78.9,14.3 34.4,14.3 34.4,26.1 " />
            <polyline class="st-2" points="75.3,21.6 79,26.4 83.2,21.6 " />
            <rect x="53" y="36.7" class="st-0" width="11.1" height="8" />
            <rect x="71.1" y="28.1" class="st-0" width="15.7" height="11.9" />
            <polyline class="st-0" points="10.2,64 44.3,64 44.3,88.4 " />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    ShipLoading2: {
        image: <>
            <g>
                <circle class="st-0" cx="269.1" cy="882.5" r="41.2" />
                <g>
                    <path class="st-0" d="M276.9,898.1v-31.8 M291,898.1v-23.4c0-0.4-0.3-0.7-0.8-0.7h-13.3v-10.4c0-0.4-0.3-0.7-0.8-0.7h-23.7
                c-0.5,0-0.8,0.2-0.8,0.7v34.4"/>
                    <line class="st-0" x1="257.2" y1="871" x2="272" y2="871" />
                    <line class="st-0" x1="257.2" y1="877.5" x2="272" y2="877.5" />
                    <line class="st-0" x1="257.2" y1="884.1" x2="272" y2="884.1" />
                    <line class="st-0" x1="257.2" y1="891.2" x2="272" y2="891.2" />
                    <line class="st-0" x1="257.2" y1="896.9" x2="272" y2="896.9" />
                </g>
            </g>
            <path class="st-0" d="M15.6,61.7V44.6h-5.3c-1,0-1.8-0.8-1.8-1.8v-8c0-4.9,4-8.8,8.8-8.8h0c0,0,12.5-0.2,12.4,0h0
        c3.9,0,7.4,2.5,8.8,6.2l0.1,0.2l0.9,5.9c0.3-0.7,5-12.2,5.8-12.2l6-3.2c0.2,0,0,3.3,0.2,3.3c0.9,0.4,1.4,1.4,1,2.3l-3.4,3.2l-4,11.1
        c-0.7,1.6-2.3,2.9-3.8,3.7"/>
            <path class="st-0" d="M18.4,14.7c0-3.2,2.7-5.7,6.1-5.7s6.1,2.6,6.1,5.7v3.8c0,3.2-2.7,5.7-6.1,5.7s-6.1-2.6-6.1-5.7V14.7z" />
            <polyline class="st-0" points="12.8,38 18.1,35.8 21.7,42.5 15.6,44.6 " />
            <polyline class="st-0" points="15.7,36.4 15.7,31.3 29,31.3 29,49.4 16.2,49.4 " />
            <path class="st-0" d="M49.7,47.3c-0.3-2.4,0-3.9,3.3-3.7c6.7,0.3,13.5,0.3,20.2,0c3.2-0.2,3.5,1.3,3.3,3.7" />
            <path class="st-0" d="M60.1,48.7c-4.1-0.2-8.2-0.5-12.3-0.6c-0.6,0-1.7,1.1-1.7,1.7c-0.1,2.5,0.2,5,0.3,7.6" />
            <path class="st-0" d="M79.6,57.4c0.1-2.5,0.4-5.1,0.3-7.6c0-0.6-1.1-1.7-1.7-1.7c-4.1,0.1-8.2,0.4-12.3,0.6" />
            <path class="st-0" d="M72,43c0.3-2.7-0.2-4.4-3.6-4c-3.6,0.3-7.2,0.3-10.8,0c-3.4-0.3-3.9,1.3-3.6,4" />
            <path class="st-0" d="M70.1,38.3c0.2-1.6-0.2-2.5-2.8-2.3c-2.8,0.2-5.6,0.2-8.4,0c-2.6-0.2-3,0.8-2.8,2.3" />
            <path class="st-0" d="M46.5,83.5c-1.6-5.5-4.3-14.1-5.8-19.6c-0.2-0.8,0.1-2.3,0.7-2.8c2.3-1.6,4.8-2.9,7.2-4.4
        c4-2.5,10.5-8.1,14.5-10.7c0,0,12.3,8.5,16.3,11c2.4,1.5,4.9,2.8,7.2,4.4c0.6,0.4,1.2,1.5,1,2.1c-1.9,6.3-4,12.6-6.1,19"/>
            <path class="st-0" d="M63,46.3c0,9.9,0,26.7,0,36.6" />
            <path class="st-0" d="M56.2,58.9c-3.4,0.6-6.1,2.4-8.3,5.1" />
            <path class="st-0" d="M78.9,63.9c-2.3-2.5-4.9-4.5-8.3-5.1" />
            <path class="st-0" d="M91.5,80.9c-1.2,0.7-2.5,1.4-3.6,2.2c-2.2,1.7-4.8,1.5-6.8,0.2c-3.1-1.8-5.7-1.7-8.8,0c-3,1.7-6.1,1.9-9.4-0.2
        c-2.8-1.7-6.2-1.8-9.3,0.2c-2,1.3-4.6,2-6.8,0.7c-4.1-2.5-7.7-1.8-11.2,1.1"/>
            <path class="st-0" d="M91.5,84.9c-1.2,0.7-2.5,1.4-3.6,2.2c-2.2,1.7-4.8,1.5-6.8,0.2c-3.1-1.8-5.7-1.7-8.8,0c-3,1.7-6.1,1.9-9.4-0.2
        c-2.8-1.7-6.2-1.8-9.3,0.2c-2,1.3-4.6,2-6.8,0.7"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    SalesManager: {
        image: <>
            <path class="st-0" d="M69.8,53.6l-2.4-7.9l0-3.1h15.1c3.3,0,5.9-2.5,5.9-5.6v0c0-3.1-2.7-5.6-5.9-5.6H66.8h-4.1H20.1
       c-3.3,0-5.9,2.5-5.9,5.6v0c0,3.1,2.7,5.6,5.9,5.6h16.4l-0.2,2.2l-3,9"/>
            <g>
                <g>
                    <g>
                        <ellipse class="st-0" cx="52.1" cy="16.8" rx="11.2" ry="12.3" />
                    </g>
                </g>
            </g>
            <polyline class="st-0" points="50.6,35.7 47.6,56.9 52.1,61.6 56.5,57.3 54.1,35.7 " />
            <g>
                <g>
                    <path class="st-0" d="M89.8,61.7c0,0-1.7,0-1.7,0l-5.2,5.9l-13.3,5.7L60.9,68c-0.5-0.3-1.1-0.4-1.9-0.5c-0.7,0-1.5,0.1-1.9,0.4
               l-14.2,7.5l-10.4-8.3c-0.4-0.3-1.2-0.6-2.1-0.6c-0.9,0-1.7,0.2-2.1,0.6l-18.9,13v12.2H90"/>
                </g>
            </g>
            <line class="st-1" x1="9.2" y1="46.5" x2="9.2" y2="81.2" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    ResourceWorldwide: {
        image: <>
            <g>
                <path class="st-0" d="M6.8,36.1c0-5.6,4.6-10.2,10.2-10.2s10.2,4.6,10.2,10.2 M17.5,25c-3.1,0-5.6-2.5-5.6-5.6s2.5-5.6,5.6-5.6
           s5.6,2.5,5.6,5.6S20.6,25,17.5,25z"/>
            </g>
            <g>
                <path class="st-0" d="M73.8,36.1c0-5.6,4.6-10.2,10.2-10.2s10.2,4.6,10.2,10.2 M84.4,25c-3.1,0-5.6-2.5-5.6-5.6s2.5-5.6,5.6-5.6
           c3.1,0,5.6,2.5,5.6,5.6S87.5,25,84.4,25z"/>
            </g>
            <g>
                <path class="st-0" d="M6.8,84.5c0-5.6,4.6-10.2,10.2-10.2s10.2,4.6,10.2,10.2 M17.5,73.5c-3.1,0-5.6-2.5-5.6-5.6s2.5-5.6,5.6-5.6
           s5.6,2.5,5.6,5.6S20.6,73.5,17.5,73.5z"/>
            </g>
            <g>
                <path class="st-0" d="M73.8,84.5c0-5.6,4.6-10.2,10.2-10.2s10.2,4.6,10.2,10.2 M84.4,73.5c-3.1,0-5.6-2.5-5.6-5.6s2.5-5.6,5.6-5.6
           c3.1,0,5.6,2.5,5.6,5.6S87.5,73.5,84.4,73.5z"/>
            </g>
            <path class="st-1" d="M6.4,42.6c-0.8,4.9-0.8,10,0,14.9" />
            <path class="st-1" d="M94.8,57.5c0.8-4.9,0.8-10,0-14.9" />
            <path class="st-1" d="M71.1,10.2c-12.9-6.6-28.2-6.6-41.1,0" />
            <path class="st-1" d="M32.7,91.1c11.4,5,24.4,5,35.9,0h0" />
            <path class="st-0" d="M64.3,66.6l-1.2-2l3.2-7.4c0.3-0.8,0.1-1.7-0.7-2.2l-2.5-1.7l0.1-8.9l2.7-3.4l3.9-0.6
       C74.3,49.3,72,60.2,64.3,66.6z M61.3,68.6c-5.9,3.4-13.1,3.8-19.4,1.1c-6.3-2.8-10.9-8.3-12.3-15 M34.7,35.5
       c4.3-4.7,10.5-7.3,16.9-7c6.4,0.3,12.3,3.4,16.1,8.5 M32.5,38.4l5.2,3.4c0.3,0.2,0.6,0.3,1,0.3l9.4,0.2l2.8,4.8l-5.5,3.1l-3.1,6.9
       l-5.5-5.7c-0.4-0.4-0.9-0.7-1.5-0.6l-6.2,0.4C28.9,46.6,30.1,42.2,32.5,38.4z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    ReSearch: {
        image: <>
            <ellipse class="st-0" cx="48.4" cy="50" rx="23" ry="22.9" />
            <g>
                <line class="st-1" x1="65.1" y1="66.1" x2="82.7" y2="83.8" />
                <circle class="st-1" cx="48.5" cy="49.7" r="23.2" />
            </g>
            <g>
                <path class="st-1" d="M82.4,24.4C68.4,5.6,41.8,1.7,23,15.7S0.3,56.3,14.3,75.2s40.6,22.7,59.4,8.7C85.1,75.4,91,62.4,90.8,49.3" />
                <polyline class="st-1" points="70,23.4 82.8,25.3 84.6,12.5 	" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    RemoteCOnfigs: {
        image: <>
            <g>
                <path class="st-0" d="M65.8,20.8h-3.4c-0.5,0-1-0.3-1.2-0.8c-0.2-0.5-0.1-1,0.3-1.4l2.4-2.4c0.4-0.4,0.5-0.8,0.5-1.3
           c0-0.5-0.2-1-0.5-1.3l-3.1-3.1c-0.7-0.7-1.9-0.7-2.6,0l-2.4,2.4c-0.4,0.4-0.9,0.5-1.4,0.3c-0.5-0.2-0.8-0.7-0.8-1.2V8.6
           c0-1-0.8-1.9-1.9-1.9h-4.3c-1,0-1.9,0.8-1.9,1.9V12c0,0.5-0.3,1-0.8,1.2c-0.5,0.2-1,0.1-1.4-0.3l-2.4-2.4c-0.7-0.7-1.9-0.7-2.6,0
           l-3.1,3.1c-0.4,0.4-0.5,0.8-0.5,1.3c0,0.5,0.2,1,0.5,1.3l2.4,2.4c0.4,0.4,0.5,0.9,0.3,1.4c-0.2,0.5-0.7,0.8-1.2,0.8h-3.4
           c-1,0-1.9,0.8-1.9,1.9V27c0,1,0.8,1.9,1.9,1.9h3.4c0.5,0,1,0.3,1.2,0.8c0.2,0.5,0.1,1-0.3,1.4l-2.4,2.4c-0.4,0.4-0.5,0.8-0.5,1.3
           c0,0.5,0.2,1,0.5,1.3l3.1,3.1c0.7,0.7,1.9,0.7,2.6,0l2.4-2.4c0.4-0.4,0.9-0.5,1.4-0.3c0.5,0.2,0.8,0.7,0.8,1.2v3.4
           c0,1,0.8,1.9,1.9,1.9h4.3c1,0,1.9-0.8,1.9-1.9v-3.4c0-0.5,0.3-1,0.8-1.2c0.5-0.2,1-0.1,1.4,0.3l2.4,2.4c0.7,0.7,1.9,0.7,2.6,0
           l3.1-3.1c0.4-0.4,0.5-0.8,0.5-1.3c0-0.5-0.2-1-0.5-1.3l-2.4-2.4c-0.4-0.4-0.5-0.9-0.3-1.4s0.7-0.8,1.2-0.8h3.4c1,0,1.9-0.8,1.9-1.9
           v-4.3C67.6,21.6,66.8,20.8,65.8,20.8z"/>
                <path class="st-0" d="M49.5,18.8c-3.3,0-6,2.7-6,6s2.7,6,6,6s6-2.7,6-6S52.8,18.8,49.5,18.8z" />
            </g>
            <line class="st-1" x1="59.6" y1="39.6" x2="59.6" y2="66.8" />
            <path class="st-0" d="M59.6,83.3c-4.4,0-8-3.6-8-8c0-4.4,3.6-8,8-8c4.4,0,8,3.6,8,8C67.5,79.7,64,83.3,59.6,83.3z" />
            <path class="st-1" d="M34.9,36.6v11.6H23.7c-0.9,0-1.6,0.7-1.6,1.6v16.8" />
            <path class="st-0" d="M22.3,83.3c-4.4,0-8-3.6-8-8c0-4.4,3.6-8,8-8c4.4,0,8,3.6,8,8C30.3,79.7,26.7,83.3,22.3,83.3z" />
            <polyline class="st-1" points="63.5,36.6 78.5,36.6 78.5,77.5 " />
            <path class="st-0" d="M78.5,91.9c-3.8,0-6.9-3.1-6.9-6.9c0-3.8,3.1-6.9,6.9-6.9c3.8,0,6.9,3.1,6.9,6.9C85.5,88.8,82.4,91.9,78.5,91.9
       z"/>
            <path class="st-1" d="M49.2,43.2v5.1h-6.4c-0.9,0-1.6,0.7-1.6,1.6v6.9" />
            <circle class="st-0" cx="41.7" cy="61.5" r="4.8" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    ReceivePayment: {
        image: <>
            <path class="st0" d="M30.2,93.1c1.4-1.4,2.1-3.3,2.1-5.2c0-0.9-0.2-1.8-0.5-2.6l3.7-0.4c1.7-0.2,3.4-0.3,5.1-0.3h24.8
       c0.4,0,0.8,0,1.1,0l2.4-0.2c2.4-0.2,4.7-1,6.7-2.4c1-0.7,1.9-1.5,2.6-2.4l16.7-19.7c1.8-2.1,2.4-4.9,1.5-7.6c-1-3.3-4.2-5.6-7.7-5.4
       L88,47c-2.2,0.1-4.3,1-5.8,2.5L70.7,60.9c-0.3-0.4-0.6-0.8-0.9-1.2c-1.5-1.6-3.6-2.5-5.8-2.5H47.6c-3.1,0-6.1-0.4-8.9-1.2
       c-7.4-2-14.5-0.6-20.4,4.3c-2.5,2-4.3,4.3-5.4,5.8c-1.3-0.9-2.7-1.3-4.3-1.3c-2,0-3.8,0.8-5.2,2.2"/>
            <path class="st-0" d="M70.8,61.1c0.5,0.6,0.8,1.3,0.9,2c0,0.2,0,0.4,0.1,0.5c0,1-0.2,1.9-0.8,2.7l-0.1,0.1c-0.7,1-1.7,1.5-2.8,1.5
       H52.8"/>
            <path class="st-0" d="M52.2,52c11.9,0,21.7-9.7,21.7-21.7S64.2,8.6,52.2,8.6c-4.9,0-9.5,1.6-13.4,4.6c-0.9,0.7-1.7,1.5-2.5,2.3
       c-1.1,1.2-2.1,2.6-3,4c-1.9,3.3-2.9,7-2.9,10.8C30.6,42.2,40.3,52,52.2,52z"/>
            <line class="st-1" x1="52" y1="15" x2="52" y2="18.7" />
            <line class="st-1" x1="52" y1="40.6" x2="52" y2="44.9" />
            <path class="st-1" d="M58.6,25.4c0,0,0.5-6.4-6.9-6.4c-3.6,0-6.5,2.4-6.6,5.2c-0.1,4.8,4.1,4.5,8.7,5.7c3.4,0.9,5,2.4,4.9,5.5
       c-0.1,3.6-3.8,4.9-7.1,4.8C44.4,40,44.8,33,44.8,33"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    PlainDoc: {
        image: <>
            <g>
                <g>
                    <path class="st-0" d="M84.3,24.7l-15-15c-0.3-0.3-0.8-0.5-1.3-0.5H22c-4.7,0-8.6,3.9-8.6,8.6v65.5c0,4.7,3.9,8.6,8.6,8.6h54.2
               c4.7,0,8.6-3.9,8.6-8.6V25.9C84.8,25.5,84.6,25,84.3,24.7z M66.2,9.2v9.9c0,2.3,0.9,4.5,2.5,6.1c1.6,1.6,3.4,2.5,6.1,2.5h9.9"/>
                </g>
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Peppol: {
        image: <>
            <path class="st-0" d="M82.7,93H14.9c-4.7,0-8.4-3.8-8.4-8.4V16.8c0-4.7,3.8-8.4,8.4-8.4h67.8c4.7,0,8.4,3.8,8.4,8.4v67.8
       C91.1,89.2,87.3,93,82.7,93z"/>
            <polygon class="st-1" points="22.6,30.3 23.8,33.8 27.5,33.9 24.6,36.2 25.6,39.7 22.6,37.7 19.5,39.7 20.5,36.2 17.6,33.9 
       21.3,33.8 "/>
            <path class="st-1" d="M40.4,42.6c3.9,0.8,7.9,1.4,12,1.7" />
            <path class="st-1" d="M24.7,37.6c1.2,0.5,2.4,1,3.7,1.5c2.2,0.8,4.5,1.6,6.9,2.3" />
            <path class="st-1" d="M59.4,44.6c0.8,0,1.7,0,2.5,0c10.5-0.2,20.5-2.2,29.3-5.4V16.8h-0.1c0-4.7-3.8-8.4-8.4-8.4H14.9
       c-4.7,0-8.4,3.8-8.4,8.4v8.8c2.5,2.4,5.2,4.6,8.3,6.6c1.2,0.8,2.4,1.5,3.7,2.2"/>
            <polygon class="st-1" points="49.8,14.7 51,18.2 54.7,18.3 51.9,20.6 52.8,24.1 49.8,22.1 46.7,24.1 47.7,20.6 44.8,18.3 48.5,18.2 
       "/>
            <polygon class="st-1" points="65.2,18.8 66.4,22.2 70.1,22.4 67.3,24.7 68.2,28.2 65.2,26.2 62.1,28.2 63.2,24.7 60.2,22.4 
       63.9,22.2 "/>
            <polygon class="st-1" points="76.6,30.3 77.9,33.7 81.6,33.8 78.7,36.1 79.7,39.7 76.6,37.6 73.6,39.7 74.6,36.1 71.7,33.8 
       75.4,33.7 "/>
            <polygon class="st-1" points="80.9,45.9 82.1,49.4 85.8,49.5 82.9,51.8 83.9,55.4 80.9,53.3 77.8,55.4 78.8,51.8 75.9,49.5 
       79.5,49.4 "/>
            <polygon class="st-1" points="76.7,61.6 78,65.1 81.6,65.2 78.8,67.4 79.7,71 76.7,69 73.7,71 74.7,67.4 71.7,65.2 75.4,65.1 " />
            <polygon class="st-1" points="65.2,73 66.5,76.5 70.2,76.6 67.3,78.9 68.3,82.4 65.2,80.4 62.2,82.4 63.2,78.9 60.3,76.6 63.9,76.5 
       "/>
            <polygon class="st-1" points="49.8,77.3 51,80.8 54.7,80.9 51.9,83.2 52.8,86.7 49.8,84.7 46.7,86.7 47.7,83.2 44.8,80.9 48.5,80.8 
       "/>
            <polygon class="st-1" points="34,73 35.3,76.5 39,76.6 36,78.9 37,82.4 34,80.4 30.9,82.4 31.9,78.9 29.1,76.6 32.7,76.5 " />
            <polygon class="st-1" points="22.4,61.6 23.7,65.1 27.4,65.2 24.5,67.5 25.5,71 22.4,69 19.4,71 20.4,67.5 17.5,65.2 21.2,65.1 " />
            <polygon class="st-1" points="18.3,45.9 19.5,49.4 23.2,49.5 20.3,51.8 21.3,55.4 18.3,53.3 15.2,55.4 16.2,51.8 13.3,49.5 17,49.4 
       "/>
            <polygon class="st-1" points="34,18.8 35.3,22.2 39,22.4 36,24.7 37.1,28.2 34,26.2 30.9,28.2 32,24.7 29.1,22.4 32.8,22.2 " />
            <polygon class="st-1" points="35.7,37.6 35.7,63.8 48.8,50.8 " />
            <polygon class="st-1" points="52.1,37.6 52.1,63.8 65.2,50.8 " />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    People: {
        image: <>
            <g>
                <path class="st-0" d="M6.3,29.7c0-6.1,5-11.1,11.1-11.1s11.1,5,11.1,11.1 M18,17.6c-3.4,0-6.1-2.7-6.1-6.1s2.7-6.1,6.1-6.1
           s6.1,2.7,6.1,6.1S21.3,17.6,18,17.6z"/>
            </g>
            <g>
                <path class="st-0" d="M33.8,52.2c0-6.1,5-11.1,11.1-11.1S56,46,56,52.2 M45.4,40.1c-3.4,0-6.1-2.7-6.1-6.1s2.7-6.1,6.1-6.1
           c3.4,0,6.1,2.7,6.1,6.1S48.8,40.1,45.4,40.1z"/>
            </g>
            <g>
                <path class="st-0" d="M48,92.2c0-6.1,5-11.1,11.1-11.1c6.1,0,11.1,5,11.1,11.1 M59.6,80.1c-3.4,0-6.1-2.7-6.1-6.1
           c0-3.4,2.7-6.1,6.1-6.1c3.4,0,6.1,2.7,6.1,6.1C65.7,77.4,63,80.1,59.6,80.1z"/>
            </g>
            <g>
                <path class="st-0" d="M68.4,31.9c0-6.1,5-11.1,11.1-11.1s11.1,5,11.1,11.1 M80.1,19.8c-3.4,0-6.1-2.7-6.1-6.1s2.7-6.1,6.1-6.1
           c3.4,0,6.1,2.7,6.1,6.1S83.4,19.8,80.1,19.8z"/>
            </g>
            <g>
                <path class="st-0" d="M5,82.6c0-6.1,5-11.1,11.1-11.1s11.1,5,11.1,11.1 M16.6,70.5c-3.4,0-6.1-2.7-6.1-6.1c0-3.4,2.7-6.1,6.1-6.1
           s6.1,2.7,6.1,6.1C22.7,67.7,20,70.5,16.6,70.5z"/>
            </g>
            <g>
                <path class="st-0" d="M73.4,69.1c0-6.1,5-11.1,11.1-11.1s11.1,5,11.1,11.1 M85.1,57c-3.4,0-6.1-2.7-6.1-6.1c0-3.4,2.7-6.1,6.1-6.1
           s6.1,2.7,6.1,6.1C91.2,54.2,88.4,57,85.1,57z"/>
            </g>
            <line class="st-0" x1="6" y1="35.9" x2="6" y2="50.9" />
            <line class="st-0" x1="33.7" y1="58.1" x2="33.7" y2="71.1" />
            <line class="st-0" x1="68.3" y1="38.2" x2="68.3" y2="48.7" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    OutputDoc: {
        image: <>

            <g>
                <g>
                    <path class="st-0" d="M84.3,24.7l-15-15c-0.3-0.3-0.8-0.5-1.3-0.5H22c-4.7,0-8.6,3.9-8.6,8.6v65.5c0,4.7,3.9,8.6,8.6,8.6h54.2
               c4.7,0,8.6-3.9,8.6-8.6V25.9C84.8,25.5,84.6,25,84.3,24.7z M66.2,9.2v9.9c0,2.3,0.9,4.5,2.5,6.1c1.6,1.6,3.4,2.5,6.1,2.5h9.9"/>
                </g>
            </g>
            <g>
                <line class="st-1" x1="51.2" y1="73" x2="90.6" y2="73" />
                <g>
                    <line class="st-2" x1="51.2" y1="73" x2="79.8" y2="73" />
                    <g>
                        <polygon points="77.6,80.5 90.6,73 77.6,65.5 			" />
                    </g>
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    OneItemSelected: {
        image: <>
            <circle class="st-0" cx="18.3" cy="20.6" r="9.7" />
            <circle class="st-0" cx="51.1" cy="20.6" r="9.7" />
            <circle class="st-0" cx="84" cy="20.6" r="9.7" />
            <circle class="st-0" cx="18.3" cy="51" r="9.7" />
            <circle class="st-0" cx="51.1" cy="51" r="9.7" />
            <circle class="st1" cx="84.2" cy="50.9" r="11.3" />
            <circle class="st-0" cx="18.3" cy="81.4" r="9.7" />
            <circle class="st-0" cx="51.1" cy="81.4" r="9.7" />
            <circle class="st-0" cx="84" cy="81.4" r="9.7" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    O2C: {
        image: <>
            <g>
                <path class="st-0" d="M46.3,48.6c0,0.8-0.1,1.5-0.4,2.2c-0.2,0.7-0.6,1.2-1,1.7c-0.5,0.5-1,0.8-1.6,1.1s-1.3,0.4-2.1,0.4
           c-0.8,0-1.5-0.1-2.1-0.4c-0.6-0.3-1.2-0.6-1.6-1.1c-0.5-0.5-0.8-1-1-1.7c-0.2-0.7-0.4-1.4-0.4-2.2c0-0.8,0.1-1.5,0.4-2.2
           c0.2-0.7,0.6-1.2,1-1.7c0.5-0.5,1-0.8,1.6-1.1c0.6-0.3,1.3-0.4,2.1-0.4c0.8,0,1.5,0.1,2.1,0.4c0.6,0.3,1.2,0.6,1.6,1.1
           c0.5,0.5,0.8,1,1,1.7C46.2,47.1,46.3,47.8,46.3,48.6z"/>
                <path class="st-0" d="M47.9,46.2c0.1-0.5,0.2-0.9,0.4-1.3c0.2-0.4,0.4-0.7,0.7-0.9c0.3-0.2,0.6-0.4,1-0.6c0.4-0.1,0.8-0.2,1.2-0.2
           c0.4,0,0.9,0.1,1.2,0.2c0.4,0.1,0.7,0.3,1,0.6c0.3,0.3,0.5,0.6,0.7,0.9c0.2,0.4,0.2,0.8,0.2,1.2c0,0.4-0.1,0.7-0.2,1.1
           c-0.1,0.3-0.3,0.6-0.5,1c-0.2,0.3-0.4,0.6-0.7,0.9s-0.5,0.6-0.8,0.9l-4,3.7c0.2-0.1,0.4,0,0.6,0c0.2,0,0.4,0,0.6,0h5.1"/>
                <path class="st-0" d="M64.9,52.4c-0.4,0.5-0.9,0.9-1.6,1.2c-0.6,0.3-1.3,0.4-2.2,0.4c-0.7,0-1.4-0.1-2-0.4c-0.6-0.3-1.1-0.6-1.6-1.1
           c-0.4-0.5-0.8-1-1-1.7c-0.2-0.7-0.4-1.4-0.4-2.2c0-0.8,0.1-1.5,0.4-2.2c0.2-0.7,0.6-1.2,1-1.7c0.4-0.5,1-0.8,1.6-1.1
           c0.6-0.3,1.3-0.4,2.1-0.4c0.7,0,1.4,0.1,2,0.4c0.6,0.2,1.1,0.6,1.5,1"/>
            </g>
            <circle class="st-1" cx="50.6" cy="15.6" r="12" />
            <circle class="st-1" cx="83.9" cy="33.2" r="12" />
            <circle class="st-1" cx="83.9" cy="67.7" r="12" />
            <circle class="st-1" cx="50.4" cy="84.1" r="12" />
            <circle class="st-1" cx="16.6" cy="67" r="12" />
            <circle class="st-1" cx="16.6" cy="32.5" r="12" />
            <g>
                <g>
                    <line class="st-1" x1="36.2" y1="22.9" x2="30.6" y2="25.8" />
                    <g>
                        <polygon class="st-2" points="29,19.7 28.5,21.2 35.7,23.2 33.1,30.2 34.5,30.7 37.6,22.2 			" />
                    </g>
                </g>
            </g>
            <g>
                <g>
                    <line class="st-1" x1="69.2" y1="25.3" x2="64.6" y2="23" />
                    <g>
                        <polygon class="st-2" points="67.6,17.6 66.2,18.1 68.7,25 61.6,27.1 62,28.5 70.7,26 			" />
                    </g>
                </g>
            </g>
            <g>
                <g>
                    <line class="st-1" x1="84.5" y1="52" x2="84.5" y2="48.1" />
                    <g>
                        <polygon class="st-2" points="90.6,47 89.5,46 84.5,51.4 79.4,46 78.3,47 84.5,53.6 			" />
                    </g>
                </g>
            </g>
            <g>
                <g>
                    <line class="st-1" x1="65.7" y1="78.2" x2="70.6" y2="75.8" />
                    <g>
                        <polygon class="st-2" points="72.9,81.5 73.3,80.1 66.3,78 68.9,71.1 67.5,70.5 64.3,78.9 			" />
                    </g>
                </g>
            </g>
            <g>
                <g>
                    <line class="st-1" x1="31.9" y1="75.1" x2="36.6" y2="77.3" />
                    <g>
                        <polygon class="st-2" points="33.7,82.7 35.1,82.2 32.4,75.3 39.4,73.1 39,71.7 30.4,74.4 			" />
                    </g>
                </g>
            </g>
            <g>
                <g>
                    <line class="st-1" x1="16.5" y1="48.6" x2="16.5" y2="53" />
                    <g>
                        <polygon class="st-2" points="10.4,53.6 11.5,54.6 16.5,49.2 21.5,54.6 22.6,53.6 16.5,47 			" />
                    </g>
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Nuts: {
        image: <>
            <circle class="st-0" cx="50.5" cy="53.2" r="41.7" />
            <path class="st-1" d="M61.1,6.1c-2.3-2.3-5.2-3.5-8.4-3.5c-3.2,0-6.2,1.2-8.4,3.5c-4.2,4.2-4.7,12-1.1,16.8l9.6,13.8l9.5-13.8
       C65.7,18.1,65.2,10.3,61.1,6.1z"/>
            <path class="st-1" d="M27.5,30.8c-2.3-2.3-5.2-3.5-8.4-3.5c-3.2,0-6.2,1.2-8.4,3.5c-4.2,4.2-4.7,12-1.1,16.8l9.6,13.8l9.5-13.8
       C32.2,42.8,31.7,35,27.5,30.8z"/>
            <g>
                <path class="st-2" d="M92.4,48.4c1.8,14.3-3.8,29-15.6,38.3 M66.8,14.9c8.3,3.4,15.6,9.5,20.4,17.8c1.9,3.3,3.3,6.7,4.2,10.2l-4-1
           l0.7,5.6l-4.7,0.7l-2.2,9.6c0,0-2.5-2.9-3.2-4.7C77.4,51.5,71,48,71,48s-2.9,1.7-4.4,1.5c-1.5-0.2-1.2-3.7-1.2-3.7 M46.1,28.6
           c-2.8,0-7.3,2-8.8,4.4l-2.7-3.7l2.6-6.3 M13.7,58.5L21,64c0.2,0.2,0.5,0.3,0.7,0.3l4.4,0.9c0.6,0.1,1,0.4,1.3,0.9
           c0.3,0.5,0.4,1.1,0.2,1.6c-0.4,1.1-0.4,2.3,0,3.4l0.6,1.7c0.3,1-0.2,2.2-1.3,2.5L25.2,76c-0.6,0.2-1.1,0.7-1.2,1.4l-1.4,7.4
           c-3.1-2.9-5.9-6.2-8.1-10.1C11.7,70,10,65,9.3,59.9L13.7,58.5z M16.9,27.1c5.8-7,13.7-12.1,22.8-14.2 M63.4,45.3
           c-0.1,0.1,2.3,6.5,2.2,6.6c-0.8,0.9-2.4,0-2.9,1.7c-0.2,0.5-2.8-3.1-3.2-2.7c-0.3,0.3,3,4.8,2.7,5.4c-0.4,0.7-0.2,7.1-1.7,15
           c-0.1,0.5-2.8,8.4-3,8.7c-0.5,0.6-1.3,1.4-2.2,2c-0.8,0.5-1.3,0.6-1.5,0.6c-0.2-0.2-0.9-1.1-1.9-4.2c-0.3-0.8-0.6-1.5-1-2.3
           c-0.8-1.7-1.5-3.4-1.2-4.6c0-0.1,0.1-0.3,0.1-0.4c0.6-1.9,1.2-3.6,0.1-6.2c-0.3-0.8-0.8-1.3-1.3-1.8c-0.3-0.3-0.6-0.7-0.7-0.9
           c-0.1-0.3-0.1-0.6-0.1-0.9c0-0.9,0-2.3-1.4-3.6c-2-1.8-4.3-1.3-5.8-0.9c-0.5,0.1-0.9,0.2-1.3,0.3c-2.5,0.3-4.7-0.7-6.1-2.6
           c-1.5-2-1.7-4.8-0.6-7.1c0.5-1.1,1.4-2.1,2.3-3.1c0.2-0.2,0.4-0.5,0.6-0.7c0.3-0.4,0.7-0.9,1.1-1.5c0.5-0.7,1.4-2,1.8-2.2
           c0.8-0.4,2.6-0.5,4-0.6c0.5,0,1,0,1.5-0.1c0.2,0,0.5,0,0.8,0c-0.1,0.3-0.1,0.6-0.1,0.9c0.1,0.6,0.4,1,0.9,1.3
           c0.3,0.2,0.8,0.5,1.3,0.8c1.4,0.9,3,2,4.4,2.1c1.3,0.1,2.1-0.7,2.4-1c0,0,0-0.1,0.1-0.1c0.2-0.1,0.4-0.3,0.5-0.6
           c0.3,0.1,0.6,0.2,0.9,0.2"/>
            </g>
            <path class="st-2" d="M19.2,34.8c-2.4,0-4.4,2-4.4,4.4c0,2.4,2,4.4,4.4,4.4s4.4-2,4.4-4.4S21.6,34.8,19.2,34.8z" />
            <path class="st-2" d="M52.7,10.1c-2.4,0-4.4,2-4.4,4.4s2,4.4,4.4,4.4c2.4,0,4.4-2,4.4-4.4S55.1,10.1,52.7,10.1z" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    NotInDoc: {
        image: <>
            <path class="st-0" d="M77,92.2H22.7c-5,0-9-4-9-8.9V17.4c0-4.9,4.1-8.9,9-8.9h46.4L86,26.3v57C86,88.1,82,92.2,77,92.2z" />
            <g>
                <g>
                    <path class="st-1" d="M86,47.4V25.7c0-0.5-0.2-0.9-0.5-1.3L70.4,9.3C70,9,69.6,8.8,69.1,8.8H22.7c-4.8,0-8.7,3.9-8.7,8.7v66
               c0,4.8,3.9,8.7,8.7,8.7h8.7 M67.3,8.8v10c0,2.3,0.9,4.5,2.5,6.1c1.6,1.6,3.5,2.5,6.1,2.5h10"/>
                </g>
            </g>
            <path class="st-2" d="M31.9,65.9c0-12.8,10.4-23.1,23.1-23.1s17.8,4.6,21.1,14.4c0.5,1.4,6,13.4,5.7,14.8c-0.3,1.7-4.9,1.5-5.6,3.1
       c-3.5,8.3-11.7,14-21.3,14C42.2,89.1,31.9,78.7,31.9,65.9z"/>
            <line class="st-2" x1="65.8" y1="64.8" x2="73" y2="64.8" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Network: {
        image: <>
            <g>
                <g>
                    <path class="st-0" d="M28.3,41h-6.6v-4.4h12.4c3.7,0,5.1-2.6,5.1-5.1V14.1c0-3.7-2.6-5.1-5.1-5.1H8.1C5.6,9,3,10.4,3,14.1v17.5
               c0,3.7,2.6,5.1,5.1,5.1h12.4V41h-6.3"/>
                </g>
            </g>
            <g>
                <g>
                    <path class="st-0" d="M86.8,41h-6.6v-4.4h12.4c3.7,0,5.1-2.6,5.1-5.1V14.1c0-3.7-2.6-5.1-5.1-5.1H66.6c-2.4,0-5.1,1.3-5.1,5.1v17.5
               c0,3.7,2.6,5.1,5.1,5.1H79V41h-6.3"/>
                </g>
            </g>
            <g>
                <g>
                    <path class="st-0" d="M28.3,95.7h-6.6v-4.4h12.4c3.7,0,5.1-2.6,5.1-5.1V68.8c0-3.7-2.6-5.1-5.1-5.1H8.1c-2.4,0-5.1,1.3-5.1,5.1
               v17.5c0,3.7,2.6,5.1,5.1,5.1h12.4v4.4h-6.3"/>
                </g>
            </g>
            <path class="st-1" d="M38.8,22.8h23.3" />
            <path class="st-1" d="M21.1,39.9v23.3" />
            <g>
                <g>
                    <line class="st-1" x1="39.4" y1="78.6" x2="41.4" y2="78.6" />
                    <line class="st-2" x1="45.4" y1="78.6" x2="75.4" y2="78.6" />
                    <polyline class="st-1" points="77.4,78.6 79.4,78.6 79.4,76.5 		" />
                    <line class="st-3" x1="79.4" y1="72.8" x2="79.4" y2="45" />
                    <line class="st-1" x1="79.4" y1="43.1" x2="79.4" y2="41.1" />
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    MeetingTable: {
        image: <>
            <g>
                <g>
                    <g>
                        <ellipse class="st-0" cx="25.4" cy="13.1" rx="4.5" ry="5.2" />
                    </g>
                </g>
            </g>
            <path class="st-0" d="M34.5,30.5c0-9.5-4.1-11.3-9.2-11.3s-9.2,1.7-9.2,11.3v2" />
            <g>
                <g>
                    <g>
                        <ellipse class="st-0" cx="50.5" cy="13.1" rx="4.5" ry="5.2" />
                    </g>
                </g>
            </g>
            <path class="st-0" d="M59.6,30.5c0-9.5-4.1-11.3-9.2-11.3s-9.2,1.7-9.2,11.3" />
            <g>
                <g>
                    <g>
                        <ellipse class="st-0" cx="75.5" cy="13.1" rx="4.5" ry="5.2" />
                    </g>
                </g>
            </g>
            <path class="st-0" d="M66.4,30.5c0-9.5,4.1-11.3,9.2-11.3c5.1,0,9.2,1.7,9.2,11.3v2.3" />
            <g>
                <g>
                    <g>
                        <ellipse class="st-0" cx="50.5" cy="87.6" rx="4.5" ry="5.2" />
                    </g>
                </g>
            </g>
            <path class="st-0" d="M41.3,70.1c0,9.5,4.1,11.3,9.2,11.3s9.2-1.7,9.2-11.3" />
            <g>
                <g>
                    <g>
                        <ellipse class="st-0" cx="75.4" cy="87.6" rx="4.5" ry="5.2" />
                    </g>
                </g>
            </g>
            <path class="st-0" d="M66.2,70.1c0,9.5,4.1,11.3,9.2,11.3c5.1,0,9.2-1.7,9.2-11.3v-1.8" />
            <g>
                <g>
                    <g>
                        <ellipse class="st-0" cx="25.4" cy="87.6" rx="4.5" ry="5.2" />
                    </g>
                </g>
            </g>
            <path class="st-0" d="M34.5,70.1c0,9.5-4.1,11.3-9.2,11.3s-9.2-1.7-9.2-11.3v-0.8" />
            <path class="st-0" d="M78.1,69.9H21.7c-6.6,0-12-5.4-12-12V43.3c0-6.6,5.4-12,12-12h56.4c6.6,0,12,5.4,12,12v14.5
       C90.1,64.5,84.7,69.9,78.1,69.9z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Matrix: {
        image: <>
            <path class="st-0" d="M86.2,88.7H14.2c-1.7,0-3-1.4-3-3V13.1c0-1.7,1.4-3,3-3h71.9c1.7,0,3,1.4,3,3v72.6
       C89.2,87.3,87.8,88.7,86.2,88.7z"/>
            <g>
                <path class="st-1" d="M89.1,29.7V13l0,0c0-1.9-1.7-3.6-3.6-3.6H68.8" />
                <path class="st-1" d="M11,67.3V84l0,0c0,1.9,1.7,3.6,3.6,3.6h16.7" />
                <path class="st-1" d="M87.7,10.3L12.5,86.1" />
                <path class="st-1" d="M68.8,88.8h16.7l0,0c1.9,0,3.6-1.7,3.6-3.6V68.5" />
                <path class="st-1" d="M31.3,10.7H14.6l0,0c-1.9,0-3.6,1.7-3.6,3.6V31" />
                <path class="st-1" d="M87.7,87.4L12.9,12" />
            </g>
            <line class="st-1" x1="40" y1="10.7" x2="58.1" y2="10.7" />
            <line class="st-1" x1="40" y1="88.4" x2="58.1" y2="88.4" />
            <line class="st-1" x1="11.5" y1="40.5" x2="11.5" y2="55.4" />
            <line class="st-1" x1="89.1" y1="40.5" x2="89.1" y2="55.4" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    LocationCircle: {
        image: <>
            <g>
                <path class="st-0" d="M51.3,37.3c-3.3,0-6,2.7-6,6c0,3.3,2.7,6,6,6s6-2.7,6-6C57.3,39.9,54.6,37.3,51.3,37.3z" />
                <path class="st-0" d="M50,7.5C26.5,7.5,7.5,26.5,7.5,50s19,42.5,42.5,42.5c23.5,0,42.5-19,42.5-42.5S73.5,7.5,50,7.5z M62.8,53.8
           L51.2,70.6L39.5,53.7c-4.4-5.9-3.8-15.6,1.4-20.7c2.8-2.8,6.4-4.3,10.3-4.3c3.9,0,7.6,1.5,10.3,4.3C66.7,38.2,67.3,47.9,62.8,53.8z
           "/>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    ListItems: {
        image: <>
            <g>
                <circle class="st-0" cx="12.1" cy="14.6" r="4.4" />
                <line class="st-1" x1="20.7" y1="14.6" x2="49.6" y2="14.6" />
            </g>
            <g>
                <circle class="st-0" cx="12.1" cy="29.7" r="4.4" />
                <line class="st-1" x1="20.7" y1="29.7" x2="38.2" y2="29.7" />
            </g>
            <g>
                <circle class="st-0" cx="56.7" cy="36.9" r="4.4" />
                <line class="st-1" x1="65.2" y1="36.9" x2="94.2" y2="36.9" />
            </g>
            <g>
                <circle class="st-0" cx="56.7" cy="52" r="4.4" />
                <line class="st-1" x1="65.2" y1="52" x2="82.7" y2="52" />
            </g>
            <g>
                <circle class="st-0" cx="29.6" cy="71.5" r="4.4" />
                <line class="st-1" x1="38.2" y1="71.5" x2="59.9" y2="71.5" />
            </g>
            <g>
                <circle class="st-0" cx="29.6" cy="86.6" r="4.4" />
                <line class="st-1" x1="38.2" y1="86.6" x2="76.1" y2="86.6" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    LikeDesktop: {
        image: <>

            <g>
                <g>
                    <path class="st-0" d="M30.5,18.4H20.3c-5.3,0-11,2.9-11,11v37.9c0,8.1,5.7,11,11,11h24.5h7.7h24.5c8.1,0,11-5.7,11-11V54" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M60.1,85.2h-7.6v-7 M44.8,78.3v7h-7" />
                </g>
            </g>
            <path class="st-0" d="M57.5,73.8c-0.9,0-1.8-0.3-2.4-0.9c-2.6-2.2-5-4.3-7.2-6.2l0,0C41.5,61.3,36,56.6,32.2,52
       C27.9,46.8,26,42,26,36.6c0-5.2,1.8-10,5-13.5c3.3-3.5,7.8-5.5,12.6-5.5c3.6,0,7,1.2,9.9,3.4c1.5,1.1,2.8,2.6,4,4.2
       c1.2-1.6,2.5-3,4-4.2c2.9-2.3,6.3-3.4,9.9-3.4c4.9,0,9.4,2,12.6,5.5c3.2,3.5,5,8.3,5,13.5c0,5.3-2,10.2-6.3,15.4
       c-3.8,4.6-9.3,9.3-15.7,14.7c-2.2,1.9-4.6,4-7.2,6.2C59.3,73.5,58.4,73.8,57.5,73.8z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    IT: {
        image: <>
            <g>
                <circle class="st-0" cx="269.1" cy="882.5" r="41.2" />
                <g>
                    <path class="st-0" d="M276.9,898.1v-31.8 M291,898.1v-23.4c0-0.4-0.3-0.7-0.8-0.7h-13.3v-10.4c0-0.4-0.3-0.7-0.8-0.7h-23.7
               c-0.5,0-0.8,0.2-0.8,0.7v34.4"/>
                    <line class="st-0" x1="257.2" y1="871" x2="272" y2="871" />
                    <line class="st-0" x1="257.2" y1="877.5" x2="272" y2="877.5" />
                    <line class="st-0" x1="257.2" y1="884.1" x2="272" y2="884.1" />
                    <line class="st-0" x1="257.2" y1="891.2" x2="272" y2="891.2" />
                    <line class="st-0" x1="257.2" y1="896.9" x2="272" y2="896.9" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M43.5,81.5h7.9v6.6h-6.8c-0.9,0-1.6,0.7-1.6,1.6s0.7,1.6,1.6,1.6h21.8c0.9,0,1.6-0.7,1.6-1.6
               s-0.7-1.6-1.6-1.6h-7.5v-6.6h23.9c7.9,0,10.7-5.3,10.7-10.3V35.5c0-7.6-5.5-10.3-10.7-10.3H69.6l-3.9,0.1
               c-1.9-3.8-5.8-6.5-10.3-6.8c-1-0.3-2.1-0.4-3.2-0.4H50c-1.4-6.2-6.9-10.8-13.5-10.8c-6.9,0-12.5,5-13.7,11.5
               c-2.8,1-5.2,2.9-6.7,5.4c-4.8,0.7-8.5,4.8-8.5,9.8c0,3.6,2,6.8,4.9,8.6v9.3c0,0-3.5-0.1-5.3,0.6c-1.8,0.7-1,2.2-1,3.4
               c0,1.2,0,13.5,0,15.3s1,4.2,3.4,4.2s7.7,0,7.7,0v9.7H43L43.5,81.5z"/>
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M43.5,81.5h7.9v6.6h-6.8c-0.9,0-1.6,0.7-1.6,1.6s0.7,1.6,1.6,1.6h21.8c0.9,0,1.6-0.7,1.6-1.6
               s-0.7-1.6-1.6-1.6h-7.5v-6.6h23.9c7.9,0,10.7-5.3,10.7-10.3V35.5c0-7.6-5.5-10.3-10.7-10.3h-17"/>
                </g>
            </g>
            <path class="st-2" d="M66.9,29.5c-0.7-5.9-5.5-10.5-11.5-11c-1-0.3-2.1-0.4-3.2-0.4H50c-1.4-6.2-6.9-10.8-13.5-10.8
       c-6.9,0-12.5,5-13.7,11.5c-2.8,1-5.2,2.9-6.7,5.4c-4.8,0.7-8.5,4.8-8.5,9.8c0,3.6,2,6.8,4.9,8.6"/>
            <line class="st-3" x1="48.4" y1="43.9" x2="52.2" y2="43.9" />
            <path class="st-3" d="M43.4,41.8h2.8c1.2,0,2.1,1,2.1,2.1v7.6" />
            <path class="st-3" d="M12.2,51.6V44c0-1.2,1-2.1,2.1-2.1h2.9" />
            <polyline class="st-3" points="17.3,51.4 17.3,35.4 43.3,35.4 43.3,51.4 " />
            <polyline class="st-3" points="43.3,69.2 43.3,85.1 17.3,85.1 17.3,69.2 " />
            <path class="st-3" d="M17.5,75.4H9.7c-2.1,0-3.8-1.7-3.8-3.8V55.5c0-2.1,1.7-3.8,3.8-3.8h42.2c2.1,0,3.8,1.7,3.8,3.8v16.1
       c0,2.1-1.7,3.8-3.8,3.8h-8.6"/>
            <circle class="st-3" cx="43.6" cy="56.5" r="2.1" />
            <circle class="st-3" cx="50.1" cy="56.5" r="2.1" />
            <line class="st-3" x1="11.9" y1="57.4" x2="17.8" y2="57.4" />
            <line class="st-3" x1="15.2" y1="69" x2="46.3" y2="69" />
            <line class="st-3" x1="22.4" y1="73.2" x2="39.6" y2="73.2" />
            <line class="st-3" x1="22.4" y1="77.3" x2="39.6" y2="77.3" />
            <line class="st-3" x1="22.4" y1="81.4" x2="39.6" y2="81.4" />
            <path class="st-2" d="M85.6,42.8c0-3.6-2.8-6.6-6.3-6.8c-0.6-0.1-1.2-0.2-1.8-0.2h-1.2c-0.8-3.4-3.8-5.9-7.4-5.9
       c-3.7,0-6.9,2.7-7.5,6.3c-1.5,0.5-2.8,1.6-3.7,2.9c-2.6,0.4-4.6,2.6-4.6,5.3c0,3,2.4,5.4,5.4,5.4h4.6c0.2,0,0.4,0,0.6,0h13.8
       c0.2,0,0.4,0,0.6,0h1c1.5,0,2.9-0.6,3.9-1.6C84.6,46.9,85.6,45,85.6,42.8z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    IntoFolder: {
        image: <>
            <polyline class="st-0" points="55.8,21.2 47.7,29.5 39.4,21.1 " />
            <path class="st-1" d="M81.7,89.6H16.2c-3,0-5.4-2.4-5.4-5.4V41.1c0-3,2.4-5.4,5.4-5.4h65.5c3,0,5.4,2.4,5.4,5.4v43.2
       C87,87.2,84.6,89.6,81.7,89.6z"/>
            <polyline class="st-2" points="40.7,35.6 51.3,47.2 85.9,47.2 " />
            <path class="st-0" d="M47.7,29.5V15.2c0,0-1.4-8.8,9-8.8c0.4,0,24.6,0,24.6,0" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    IntegrationService: {
        image: <>
            <g>
                <path class="st-0" d="M14.4,57.8c0-3.3,2.7-5.9,5.9-5.9c1.6,0,3,0.6,4,1.6 M20.7,51.4c-1.8,0-3.3-1.5-3.3-3.3s1.5-3.3,3.3-3.3
           s3.3,1.5,3.3,3.3S22.5,51.4,20.7,51.4z"/>
            </g>
            <circle class="st-0" cx="52.7" cy="62.9" r="22.9" />
            <circle class="st-0" cx="52.7" cy="62.9" r="12" />
            <circle class="st-0" cx="52.8" cy="62.4" r="3" />
            <path class="st-0" d="M66.8,56.2c1,2,1.6,4.2,1.6,6.6c0,2.7-0.8,5.3-2.1,7.5" />
            <path class="st-0" d="M62.7,49.1c2.2,1.5,4.1,3.4,5.3,5.8c1.3,2.3,2,5,2,7.9" />
            <g>
                <g>
                    <polyline class="st-0" points="35,22.3 53.3,10.6 72.7,22.3 		" />
                </g>
                <line class="st-0" x1="53.3" y1="10.6" x2="53.3" y2="38.2" />
            </g>
            <path class="st-0" d="M40.4,43.4v-5.2H20l-12.5,20v16.3H5.4v6.3l3.3,1.9h3.8c0,0,2.7-8.4,9.4-8.4c8.6,0,9.9,7.3,9.9,7.3h7.7" />
            <polyline class="st-0" points="17.9,42.2 29.2,42.2 23.4,57.5 7.7,57.5 " />
            <circle class="st-0" cx="22.5" cy="82.5" r="5.6" />
            <circle class="st-0" cx="79.7" cy="82.5" r="5.6" />
            <path class="st-0" d="M69.9,78.8h2.7c0,0,2.1-4.6,7.3-4.6c5.2,0,7.7,4.6,7.7,4.6h9.3v-18H75.1" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Integration1: {
        image: <>
            <g>
                <path class="st-0" d="M76.1,8c0,7.9-4.2,18.3-9.3,18.3h-34c-5.1,0-9.3-10.4-9.3-18.3" />
                <g>
                    <path class="st-0" d="M59.2,86.5c0-6.7,5.5-12.2,12.2-12.2c4,0,7.6,2,9.9,5 M72,73.2c-3.7,0-6.7-3-6.7-6.7c0-3.7,3-6.7,6.7-6.7
               c3.7,0,6.7,3,6.7,6.7C78.7,70.2,75.7,73.2,72,73.2z"/>
                </g>
                <circle class="st-0" cx="42.4" cy="69.7" r="17.4" />
                <circle class="st-0" cx="42.4" cy="69.7" r="9.1" />
                <circle class="st-0" cx="42.5" cy="69.3" r="2.3" />
                <path class="st-0" d="M53.2,64.6c0.8,1.5,1.2,3.2,1.2,5c0,2.1-0.6,4-1.6,5.7" />
                <path class="st-0" d="M50.1,59.2c1.7,1.1,3.1,2.6,4.1,4.4c1,1.8,1.5,3.8,1.5,6" />
                <g>
                    <g>
                        <polyline class="st-0" points="36.8,38.3 50.7,29.4 65.5,38.3 			" />
                    </g>
                    <line class="st-0" x1="50.7" y1="29.4" x2="50.7" y2="50.4" />
                </g>
                <path class="st-0" d="M79.2,18.2c8.4,7.8,13.6,19,13.6,31.4c0,9.7-3.2,18.7-8.6,25.9" />
                <path class="st-0" d="M77.2,82.8c-7.4,6.2-17,9.8-27.4,9.8c-23.8,0-43-19.3-43-43c0-12.2,5.1-23.2,13.2-31" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Integration: {
        image: <>
            <path class="st-0" d="M68.1,35.4c0-0.6,0-15,0-15h15.8v37.3" />
            <g>
                <path class="st-0" d="M59.1,88.8c0-7.8,6.3-14.1,14.1-14.1S87.4,81,87.4,88.8 M74,73.4c-4.3,0-7.8-3.5-7.8-7.8s3.5-7.8,7.8-7.8
           c4.3,0,7.8,3.5,7.8,7.8S78.2,73.4,74,73.4z"/>
            </g>
            <polyline class="st-0" points="42.5,49.9 42.5,11 12.1,11 12.1,74.3 " />
            <polyline class="st-0" points="68.1,47.1 68.1,28.5 42.5,28.5 42.5,62.9 " />
            <line class="st-0" x1="19.4" y1="17.8" x2="35.8" y2="17.8" />
            <line class="st-0" x1="19.4" y1="24.4" x2="35.8" y2="24.4" />
            <line class="st-0" x1="74.4" y1="27.3" x2="80.1" y2="27.3" />
            <line class="st-0" x1="74.4" y1="34.7" x2="80.1" y2="34.7" />
            <line class="st-0" x1="74.4" y1="43.3" x2="80.1" y2="43.3" />
            <g>
                <g>
                    <polyline class="st-0" points="23.8,42.1 40,31.7 57.1,42.1 		" />
                </g>
                <line class="st-0" x1="40" y1="31.7" x2="40" y2="49.6" />
            </g>
            <circle class="st-0" cx="39.7" cy="69.4" r="20.2" />
            <circle class="st-0" cx="39.7" cy="69.4" r="10.6" />
            <circle class="st-0" cx="39.8" cy="69" r="2.7" />
            <path class="st-0" d="M52.2,63.5c0.9,1.7,1.4,3.7,1.4,5.8c0,2.4-0.7,4.7-1.8,6.6" />
            <path class="st-0" d="M48.6,57.3c2,1.3,3.6,3,4.7,5.1c1.1,2.1,1.8,4.4,1.8,7" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    InputDoc: {
        image: <>
            <g>
                <g>
                    <path class="st-0" d="M84.3,24.7l-15-15c-0.3-0.3-0.8-0.5-1.3-0.5H22c-4.7,0-8.6,3.9-8.6,8.6v65.5c0,4.7,3.9,8.6,8.6,8.6h54.2
               c4.7,0,8.6-3.9,8.6-8.6V25.9C84.8,25.5,84.6,25,84.3,24.7z M66.2,9.2v9.9c0,2.3,0.9,4.5,2.5,6.1c1.6,1.6,3.4,2.5,6.1,2.5h9.9"/>
                </g>
            </g>
            <g>
                <line class="st-1" x1="3.8" y1="28.6" x2="43.1" y2="28.6" />
                <g>
                    <line class="st-2" x1="3.8" y1="28.6" x2="32.4" y2="28.6" />
                    <g>
                        <polygon points="30.2,36.1 43.1,28.6 30.2,21.2 			" />
                    </g>
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    InOut: {
        image: <>

            <path class="st-0" d="M75.4,83H24.6C17.1,83,11,76.9,11,69.4V32.2c0-7.5,6.1-13.6,13.6-13.6h50.8c7.5,0,13.6,6.1,13.6,13.6v37.2
       C89,76.9,82.9,83,75.4,83z"/>
            <g>
                <path class="st-1" d="M76.3,7.6L87,18.5L76.3,30" />
                <path class="st-1" d="M23.8,94.7L13.1,83.8l10.7-11.5" />
                <path class="st-2" d="M85.4,18.9H24.8c-7.8,0-14.1,6.4-14.1,14.1v28" />
                <path class="st-2" d="M14.7,83.4h60.6c7.8,0,14.1-6.2,14.1-14.1v-28" />
                <path class="st-2" d="M29.4,38.6h42.4" />
                <path class="st-2" d="M29.4,50.6h42.4" />
                <path class="st-2" d="M29.4,62.7h42.4" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Info: {
        image: <>
            <circle class="st-0" cx="50" cy="50.4" r="42.4" />
            <path class="st-1" d="M25.7,60.8V36.3" />
            <path class="st-1" d="M34.7,46.1L34.7,46.1c0.9-1.7,3-3.3,5.9-3.3c2.4,0,6.2,1.5,6.2,7.5v10.5 M34.6,60.8V48c0-1.8,0-3.3-0.1-4.8" />
            <path class="st-1" d="M54.6,43.2h7 M51.7,43.2h2.5v-0.8c0-2.5,0.5-4.7,2-6.1c1.2-1.2,2.8-1.6,4.3-1.6c1.1,0,2.1,0.3,2.7,0.5
        M54.2,60.8V42.9"/>
            <path class="st-1" d="M80.8,51.8c0,6.5-4.5,9.3-8.7,9.3c-4.8,0-8.4-3.5-8.4-9c0-5.9,3.8-9.3,8.7-9.3C77.4,42.8,80.8,46.5,80.8,51.8z"
            />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    GroupTiming: {
        image: <>
            <g>
                <circle class="st-0" cx="61.4" cy="68.3" r="24.8" />
                <g>
                    <polyline class="st-0" points="61.7,54.3 61.7,68.3 72.8,80 		" />
                </g>
            </g>
            <g>
                <path class="st-0" d="M9.5,51.1c0-7.6,6.2-13.8,13.8-13.8S37,43.5,37,51.1 M24,36.2c-4.2,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5
           s7.5,3.4,7.5,7.5S28.1,36.2,24,36.2z"/>
            </g>
            <g>
                <path class="st-0" d="M40.3,36.4c0-7.6,6.2-13.8,13.8-13.8s13.8,6.2,13.8,13.8 M54.7,21.5c-4.2,0-7.5-3.4-7.5-7.5s3.4-7.5,7.5-7.5
           s7.5,3.4,7.5,7.5S58.9,21.5,54.7,21.5z"/>
            </g>
            <path class="st-1" d="M33.1,80.6h-8.2c-8.4,0-15.4-6.9-15.4-15.4" />
            <path class="st-1" d="M66.1,11.3l7.8,0.4c8.4,0,15.4,6.9,15.4,15.4v23.6" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    GraphUp: {
        image: <>
            <g>
                <g>
                    <line class="st-0" x1="14.6" y1="69.7" x2="14.6" y2="10.1" />
                </g>
            </g>
            <polyline class="st-1" points="84,21.5 66.6,49.1 57.3,46.2 41,58.1 27.8,38.8 14.6,69.7 14.6,85.7 83.8,85.7 " />
            <polyline class="st-0" points="85,33 84.4,21.2 72.9,25.7 " />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    GlobePeople: {
        image: <>
            <g>
                <path class="st-0" d="M60.8,70.8c0-4.5,3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2 M69.4,61.9c-2.5,0-4.5-2-4.5-4.5s2-4.5,4.5-4.5
           s4.5,2,4.5,4.5S71.9,61.9,69.4,61.9z"/>
            </g>
            <g>
                <path class="st-0" d="M57.7,44.2c0-4.5,3.7-8.2,8.2-8.2c4.5,0,8.2,3.7,8.2,8.2 M66.3,35.3c-2.5,0-4.5-2-4.5-4.5s2-4.5,4.5-4.5
           c2.5,0,4.5,2,4.5,4.5S68.7,35.3,66.3,35.3z"/>
            </g>
            <g>
                <path class="st-0" d="M38.4,25.2c0-4.5,3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2 M47,16.3c-2.5,0-4.5-2-4.5-4.5s2-4.5,4.5-4.5s4.5,2,4.5,4.5
           S49.5,16.3,47,16.3z"/>
            </g>
            <g>
                <path class="st-0" d="M10.7,53.2c0-4.5,3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2 M19.3,44.3c-2.5,0-4.5-2-4.5-4.5c0-2.5,2-4.5,4.5-4.5
           s4.5,2,4.5,4.5C23.8,42.3,21.8,44.3,19.3,44.3z"/>
            </g>
            <g>
                <path class="st-0" d="M95.9,49c1.9,15.5-4.1,31.5-17,41.6 M54.9,9.4c14.2,1.4,27.6,9.3,35.2,22.6c2,3.5,3.6,7.3,4.6,11.1l-0.8,0.7
            M56.4,39.3c-0.7-0.2-1.3-0.4-1.8-0.5c-0.4-0.1-0.7-0.2-1.1-0.1c-1,0.2-1.6,0.5-2.1,0.9c-0.1,0.1-0.5,0.4-0.7,0.9
           c-0.7-0.3-1.7-1-2.3-1.4c0,0,0,0,0,0c0.2-0.8,0-1.5-0.2-1.9c-1.1-2.3-4.7-2.1-5.4-2c-0.4,0-0.9,0.1-1.4,0.1c-0.8,0-1.8,0.1-2.7,0.2
           l0-0.1c0.7-2,2.6-3.3,4.6-3.3h1.1c1.1,0,1.9-0.9,1.9-1.9s-0.9-1.9-1.9-1.9h-1.1c-3.1,0-5.9,1.6-7.5,4.2l-2.9-4l2.8-6.9 M10.3,60
           l8,6.1c0.2,0.2,0.5,0.3,0.8,0.4l4.8,0.9c0.6,0.1,1.1,0.5,1.4,1c0.3,0.5,0.4,1.2,0.2,1.8c-0.4,1.2-0.4,2.5,0,3.7l0.6,1.9
           c0.4,1.1-0.3,2.3-1.4,2.7l-1.9,0.6c-0.7,0.2-1.2,0.8-1.3,1.5L20,88.6c-3.4-3.1-6.4-6.8-8.8-11c-3-5.1-4.8-10.6-5.6-16.1L10.3,60z
            M8.1,49.7c-0.1-0.1-0.2-0.2-0.4-0.3c-0.5-0.4-1.1-1-2-1.8c1.6-9.7,6.3-18.9,13.6-25.9 M63.4,73.6c-0.1,0.2-0.3,0.3-0.4,0.4
           c-0.9,0.9-1.6,1.7-2.2,3.5c-0.2,0.5-0.4,0.8-0.8,1.2c-0.3,0.4-0.7,0.8-1.1,1.4c-0.4,0.8-0.6,1.5-0.7,2.1c-0.1,0.6-0.2,0.9-0.4,1.1
           c-0.5,0.6-1.5,1.5-2.4,2.2c-0.9,0.6-1.4,0.7-1.6,0.6c-0.2-0.2-1-1.2-2.1-4.5c-0.3-0.8-0.7-1.7-1-2.5c-0.8-1.8-1.7-3.7-1.3-5
           c0-0.2,0.1-0.3,0.1-0.4c0.7-2,1.3-3.9,0.1-6.7c-0.4-0.8-0.9-1.5-1.4-2c-0.3-0.4-0.7-0.8-0.7-1c-0.1-0.3-0.1-0.6-0.1-1
           c0-1,0-2.5-1.5-4c-2.1-2-4.6-1.4-6.3-1c-0.5,0.1-1,0.2-1.4,0.3c-2.7,0.3-5.1-0.7-6.7-2.8c-1.6-2.2-1.8-5.2-0.6-7.7
           c0.6-1.2,1.5-2.2,2.5-3.4c0.2-0.3,0.5-0.5,0.7-0.8c0.4-0.4,0.8-1,1.2-1.6c0.5-0.7,1.5-2.1,1.9-2.4c0.9-0.5,2.9-0.6,4.3-0.6
           c0.6,0,1.1,0,1.6-0.1c0.3,0,0.6,0,0.8,0C44,39.3,44,39.7,44,40c0.1,0.6,0.5,1.1,1,1.4c0.4,0.2,0.9,0.5,1.4,0.9
           c1.5,1,3.2,2.1,4.8,2.3c1.5,0.1,2.3-0.7,2.6-1.1c0,0,0.1-0.1,0.1-0.1c0.2-0.2,0.4-0.4,0.5-0.6c0.3,0.1,0.6,0.2,1,0.3"/>
            </g>
            <path class="st-0" d="M24.5,17c0,0,2.2-1.7,5.6-3.7c2.3-1.4,5.4-2.4,8-3" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Globe: {
        image: <>
            <path class="st-0" d="M76.2,81.3l-2.3-3.9l6-14.2c0.7-1.5,0.1-3.3-1.2-4.2l-4.8-3.2l0.3-16.9l5.1-6.5l7.4-1.1
       C95.2,48.4,90.9,69.1,76.2,81.3z"/>
            <path class="st-1" d="M70.6,85.3c-11.3,6.5-25.1,7.3-37.1,2c-12-5.3-20.7-15.9-23.6-28.7" />
            <path class="st-1" d="M19.7,21.9c8.2-9,20-13.9,32.2-13.3c12.2,0.6,23.5,6.5,30.8,16.3" />
            <path class="st-0" d="M15.5,27.4l10,6.6c0.5,0.4,1.2,0.6,1.8,0.6l18,0.3l5.3,9.2l-10.5,6l-5.9,13.2L23.8,52.3
       c-0.7-0.8-1.8-1.3-2.8-1.2L9,51.8C8.6,43.2,10.9,34.7,15.5,27.4z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Flows: {
        image: <>
            <g>
                <g>
                    <path class="st-0" d="M79.4,6.7H20.7c-5.5,0-11.4,3-11.4,11.4v57.3c0,8.4,5.9,11.4,11.4,11.4h25.4V94h-7.3c-1,0-1.8,0.8-1.8,1.8
               s0.8,1.8,1.8,1.8H62c1,0,1.8-0.8,1.8-1.8S62.9,94,62,94H54v-7.2h25.4c8.4,0,11.4-5.9,11.4-11.4V18C90.8,9.7,84.9,6.7,79.4,6.7z"/>
                </g>
            </g>
            <path class="st-1" d="M35.1,47.7h-4.8c-3.4,0-6.1-2.8-6.1-6.1v0c0-3.4,2.8-6.1,6.1-6.1h4.8c3.4,0,6.1,2.8,6.1,6.1v0
       C41.2,44.9,38.5,47.7,35.1,47.7z"/>
            <path class="st-1" d="M69.8,35.1H65c-3.4,0-6.1-2.8-6.1-6.1v0c0-3.4,2.8-6.1,6.1-6.1h4.8c3.4,0,6.1,2.8,6.1,6.1v0
       C76,32.4,73.2,35.1,69.8,35.1z"/>
            <path class="st-1" d="M34.7,28h-4.8c-3.4,0-6.1-2.8-6.1-6.1v0c0-3.4,2.8-6.1,6.1-6.1h4.8c3.4,0,6.1,2.8,6.1,6.1v0
       C40.9,25.3,38.1,28,34.7,28z"/>
            <path class="st-1" d="M50.9,80.1h-4.8c-3.4,0-6.1-2.8-6.1-6.1v0c0-3.4,2.8-6.1,6.1-6.1h4.8c3.4,0,6.1,2.8,6.1,6.1v0
       C57.1,77.3,54.3,80.1,50.9,80.1z"/>
            <path class="st-1" d="M71.6,57L71.6,57c-3.4,0-6.1-2.8-6.1-6.1v0c0-3.4,2.8-6.1,6.1-6.1h0c3.4,0,6.1,2.8,6.1,6.1v0
       C77.7,54.2,75,57,71.6,57z"/>
            <g>
                <g>
                    <line class="st-1" x1="41.2" y1="41.5" x2="61" y2="48.7" />
                    <g>
                        <polygon points="59.5,50.8 64.3,49.9 61.1,46.1 			" />
                    </g>
                </g>
            </g>
            <g>
                <g>
                    <line class="st-1" x1="41.1" y1="23.8" x2="54.6" y2="26.6" />
                    <g>
                        <polygon points="53.4,28.9 58.1,27.3 54.4,24 			" />
                    </g>
                </g>
            </g>
            <g>
                <g>
                    <line class="st-1" x1="41.2" y1="40.4" x2="55.4" y2="33.3" />
                    <g>
                        <polygon points="55.9,35.8 58.6,31.7 53.7,31.4 			" />
                    </g>
                </g>
            </g>
            <g>
                <g>
                    <line class="st-1" x1="66.9" y1="56.2" x2="58.9" y2="67.1" />
                    <g>
                        <polygon points="57.3,65.1 56.7,70 61.3,68 			" />
                    </g>
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    FilledDoc: {
        image: <>
            <g>
                <path class="st-0" d="M79.3,27.9l-1-1L65.1,13.7l-1-1c-0.5-0.5-1.1-0.7-1.7-0.7H24.3c-1.6,0-3.2,1.2-3.2,3.8v47.3v21.7v0.6
           c0,1.1,1.1,2.2,2.4,2.5c0.1,0,0.1,0,0.2,0.1c0.2,0,0.4,0.1,0.6,0.1h52.6c0.2,0,0.4,0,0.6-0.1c0.1,0,0.1,0,0.2-0.1
           c1.3-0.3,2.4-1.4,2.4-2.5v-0.6V63.1V30.3C80.1,29.3,79.9,28.5,79.3,27.9z"/>
            </g>
            <g>
                <line class="st-1" x1="29.3" y1="31.6" x2="58.5" y2="31.6" />
                <line class="st-1" x1="61.2" y1="31.6" x2="72" y2="31.6" />
            </g>
            <g>
                <line class="st-1" x1="29.3" y1="42.8" x2="50.6" y2="42.8" />
                <line class="st-1" x1="63.8" y1="42.8" x2="72" y2="42.8" />
            </g>
            <g>
                <line class="st-1" x1="29.3" y1="53.9" x2="55.9" y2="53.9" />
                <line class="st-1" x1="63.8" y1="53.9" x2="72" y2="53.9" />
            </g>
            <g>
                <line class="st-1" x1="29.3" y1="65" x2="48" y2="65" />
                <line class="st-1" x1="61.2" y1="65" x2="72" y2="65" />
            </g>
            <g>
                <line class="st-1" x1="29.3" y1="76.2" x2="53.2" y2="76.2" />
                <line class="st-1" x1="63.8" y1="76.2" x2="72" y2="76.2" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    FavoriteDoc: {
        image: <>

            <path class="st-0" d="M79.9,91.1H25.6c-5,0-9-4-9-8.9V16.3c0-4.9,4.1-8.9,9-8.9H72l16.9,17.8v57C88.9,87,84.9,91.1,79.9,91.1z" />
            <g>
                <g>
                    <path class="st-1" d="M88.9,46.3V24.6c0-0.5-0.2-0.9-0.5-1.3L73.2,8.2c-0.3-0.3-0.8-0.5-1.3-0.5H25.6c-4.8,0-8.7,3.9-8.7,8.7v66
               c0,4.8,3.9,8.7,8.7,8.7h8.7 M70.2,7.7v10c0,2.3,0.9,4.5,2.5,6.1c1.6,1.6,3.5,2.5,6.1,2.5h10"/>
                </g>
            </g>
            <polygon class="st-2" points="63.6,37.8 71.7,54.1 89.6,56.7 76.6,69.4 79.7,87.3 63.6,76.6 47.6,87.3 50.6,69.4 37.6,56.7 
       55.6,54.1 "/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    ERP: {
        image: <>
            <g>
                <ellipse class="st-0" cx="80.4" cy="50.6" rx="10.7" ry="10.8" />
                <ellipse class="st-0" cx="64.7" cy="80.6" rx="10.7" ry="10.8" />
                <ellipse class="st-0" cx="34" cy="80.6" rx="10.7" ry="10.8" />
                <ellipse class="st-0" cx="19.4" cy="50.3" rx="10.7" ry="10.8" />
                <ellipse class="st-0" cx="34.7" cy="19.8" rx="10.7" ry="10.8" />
                <ellipse class="st-0" cx="65.4" cy="19.8" rx="10.7" ry="10.8" />
                <line class="st-0" x1="56.9" y1="64.2" x2="60.1" y2="70.9" />
                <line class="st-0" x1="39.8" y1="29.2" x2="43.2" y2="37.1" />
                <line class="st-0" x1="57.3" y1="37.1" x2="61" y2="29.9" />
                <line class="st-0" x1="39.3" y1="71.2" x2="43.2" y2="64.2" />
                <line class="st-0" x1="63.5" y1="50.3" x2="69.8" y2="50.3" />
                <line class="st-0" x1="30" y1="50.3" x2="36.9" y2="50.3" />
                <g>
                    <path class="st-0" d="M41.1,59.1c0-5.1,4.1-9.2,9.1-9.2s9.1,4.1,9.1,9.2 M50.7,49.1c-2.8,0-5-2.3-5-5.1s2.2-5.1,5-5.1s5,2.3,5,5.1
               S53.4,49.1,50.7,49.1z"/>
                </g>
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    EmptyDoc: {
        image: <>
            <g>
                <g>
                    <g>
                        <line class="st-0" x1="26.3" y1="69" x2="28.3" y2="69" />
                        <line class="st-1" x1="32.3" y1="69" x2="70.1" y2="69" />
                        <line class="st-0" x1="72.1" y1="69" x2="74.1" y2="69" />
                    </g>
                </g>
                <g>
                    <g>
                        <line class="st-0" x1="26.3" y1="40.7" x2="28.3" y2="40.7" />
                        <line class="st-1" x1="32.3" y1="40.7" x2="70.1" y2="40.7" />
                        <line class="st-0" x1="72.1" y1="40.7" x2="74.1" y2="40.7" />
                    </g>
                </g>
                <g>
                    <g>
                        <line class="st-0" x1="50.2" y1="27.6" x2="50.2" y2="29.6" />
                        <line class="st-1" x1="50.2" y1="33.5" x2="50.2" y2="71.3" />
                        <line class="st-0" x1="50.2" y1="73.3" x2="50.2" y2="75.3" />
                    </g>
                </g>
                <g>
                    <g>
                        <g>
                            <g>
                                <path class="st-2" d="M85.6,24.2L70.8,9.4c-0.3-0.3-0.8-0.5-1.2-0.5H24.5c-4.6,0-8.4,3.8-8.4,8.4v64.2c0,4.6,3.8,8.4,8.4,8.4
                           h53.2c4.6,0,8.4-3.8,8.4-8.4V25.4C86.1,24.9,85.9,24.5,85.6,24.2z"/>
                                <g>
                                    <line class="st-3" x1="67.9" y1="9" x2="67.9" y2="11" />
                                    <path class="st-4" d="M67.9,15.1v3.6c0,2.2,0.9,4.4,2.5,6c1.6,1.6,3.4,2.5,6,2.5H82" />
                                    <line class="st-3" x1="84" y1="27.1" x2="86" y2="27.1" />
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Duplicate: {
        image: <>
            <polyline class="st-0" points="90.3,35.4 90.3,89.7 31.3,89.7 " />
            <polyline class="st-0" points="79.7,24.1 79.7,78.4 20.7,78.4 " />
            <path class="st-1" d="M10.1,9.4v56.1h58.8V9.4H10.1z" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    DollarChart: {
        image: <>

            <path class="st-0" d="M5.9,58.9c0-2.9,2.4-5.3,5.3-5.3s5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3S5.9,61.9,5.9,58.9z" />
            <path class="st-0" d="M28.8,93.5c-2.9,0-5.3-2.4-5.3-5.3c0-2.9,2.4-5.3,5.3-5.3s5.3,2.4,5.3,5.3C34.1,91.2,31.8,93.5,28.8,93.5z" />
            <path class="st-0" d="M55.3,63.2c0-2.9,2.4-5.3,5.3-5.3s5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3S55.3,66.2,55.3,63.2z" />
            <path class="st-0" d="M85.4,94.8c-2.9,0-5.3-2.4-5.3-5.3s2.4-5.3,5.3-5.3c2.9,0,5.3,2.4,5.3,5.3S88.3,94.8,85.4,94.8z" />
            <line class="st1" x1="64.7" y1="66.8" x2="81.7" y2="86.3" />
            <line class="st-1" x1="33.3" y1="84.9" x2="56.8" y2="66.8" />
            <line class="st-1" x1="14.2" y1="63.8" x2="26.4" y2="83.5" />
            <path class="st-0" d="M86.5,13.4c3.2,1.2,4.8,4.7,3.6,7.9s-4.7,4.8-7.9,3.6c-3.2-1.2-4.8-4.7-3.6-7.9S83.3,12.3,86.5,13.4z" />
            <line class="st-1" x1="81.9" y1="25" x2="64.1" y2="59.5" />
            <line class="st-2" x1="37.3" y1="4.5" x2="37.3" y2="11.3" />
            <line class="st-2" x1="37.3" y1="51.3" x2="37.3" y2="59.2" />
            <path class="st-2" d="M49.4,23.5c0,0,0.9-11.6-12.6-11.6c-6.7,0-11.9,4.3-12,9.5c-0.2,8.8,7.6,8.2,15.9,10.5c6.3,1.7,9.2,4.4,9,10.1
       c-0.3,6.6-7,9-12.9,8.8c-13.4-0.5-12.7-13.3-12.7-13.3"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Dollar: {
        image: <>
            <g>
                <path class="st-0" d="M49.7,93.2C73.6,93.2,93,73.7,93,49.8S73.6,6.5,49.7,6.5c-9.8,0-19.1,3.2-26.8,9.2c-1.8,1.4-3.4,2.9-4.9,4.5
           c-2.3,2.4-4.3,5.1-5.9,8c-3.7,6.5-5.7,14-5.7,21.6C6.3,73.7,25.7,93.2,49.7,93.2z"/>
                <path class="st-0" d="M34.7,58.2c0,7.1,4.3,13.1,10.1,14.7c0.1,2.1,1.9,3.8,4.1,3.8c2.2,0,4.1-1.8,4.1-4c5.9-1.5,11-5.9,11-13.6
           c0-9.2-9.4-14.3-14.3-14.3"/>
                <path class="st-0" d="M62.1,38.9c0-2.6,0-5.6-3-8.6c-1.8-1.8-3.9-3.1-6.2-3.7c-0.1-2.2-1.9-3.9-4.1-3.9c-2.3,0-4.1,1.8-4.1,4.1v0.3
           c-4.5,1.7-9.3,5.6-9.3,13.3c0,9.4,9.8,12.6,14.2,12.6"/>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    DocsX: {
        image: <>
            <g>
                <polyline class="st-0" points="50.3,40.9 51,30.3 57.6,38.4 52.8,56.7 58.5,55.3 69,58.1 51.2,64.4 	" />
                <polygon class="st-0" points="52.5,44.7 51,64.1 43.1,59.1 45.4,32.3 	" />
            </g>
            <polygon class="st-0" points="69,41.3 80.4,25.2 91.3,22.9 81.4,42.6 " />
            <path class="st-0" d="M30.5,25.2l-9.7-15.1L10.2,9.7c0,0,11.4,24.4,12,24.4C22.8,34.1,30.5,25.2,30.5,25.2z" />
            <polygon class="st-0" points="31.7,53.8 8.5,58.3 12.2,45.5 33.7,46.5 " />
            <path class="st-0" d="M54.5,26.4c0-0.8-1.4-14.1-1.4-14.1l14.3-7.5L72.7,20L54.5,26.4z" />
            <polygon class="st-0" points="58.4,68.7 78.1,66.8 88,81.1 67.9,89.4 " />
            <polygon class="st-0" points="37.1,67.4 19.7,80.9 42.5,91.2 52,71.6 " />
            <polygon class="st-0" points="27.8,67.4 9.3,68.7 14.1,77.8 34.8,66.8 " />
            <path class="st-0" d="M24.6,11.9c7.2-4.7,15.8-7.4,25.1-7.4c3.6,0,7.2,0.4,10.5,1.2" />
            <path class="st-0" d="M6.1,65.8C4.5,61.1,3.6,56,3.6,50.6c0-10.9,3.8-20.9,10.1-28.8" />
            <path class="st-0" d="M74.6,89.5c-7.2,4.6-15.7,7.3-24.9,7.3c-11.7,0-22.4-4.3-30.5-11.5" />
            <path class="st-0" d="M91,30.1c3.1,6.2,4.8,13.1,4.8,20.5c0,9.1-2.6,17.5-7.2,24.7" />
            <path class="st-0" d="M71.8,10.2c5,2.7,9.4,6.3,13,10.6" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    DocsPics: {
        image: <>
            <path class="st-0" d="M68.6,41.7V29.2c0-0.5-0.2-0.8-0.5-1.1L55.2,14.7c-0.2-0.3-0.6-0.5-1-0.5H14.6c-4,0-7.3,3.5-7.3,7.6v58.1
       c0,4.1,3.3,7.6,7.3,7.6h46.6c4.1,0,7.3-3.5,7.3-7.6v-3.3"/>
            <path class="st-0" d="M50,41.7c4.3,0,35.8,0,40.1,0c1.9,0,2.4,0.5,2.4,2.4c0,10,0,19.7,0,29.7c0,1.9-0.5,2.4-2.4,2.4
       c-9.2,0-33,0-39.8,0c-2.4,0-2.7-0.5-2.7-2.9c0-9.7,0.2-19.2,0.2-29.1c0-2.1,0.5-2.5,2.5-2.5"/>
            <path class="st-1" d="M48.4,60.5c0.3-0.2,0.5-0.3,0.6-0.5c4.5-4,8.6-3.8,13.1,0.3c5.4,5.1,11,10.2,16.4,15.4" />
            <path class="st-2" d="M18.1,31.7h21" />
            <path class="st-2" d="M28.6,32.8v38.8" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    DocsOk: {
        image: <>
            <path class="st-0" d="M80.5,35.9H55.3V21.2L44.2,9.6H13.9c-3.2,0-5.9,2.6-5.9,5.8v42.9c0,3.2,2.6,5.8,5.9,5.8h23.5
       c1.9,1.7,4.3,3,6.9,3.6v17c0,3.2,2.6,5.8,5.9,5.8h35.5c3.2,0,5.9-2.6,5.9-5.8V47.5L80.5,35.9z"/>
            <g>
                <g>
                    <path class="st-1" d="M55.5,39.1V20.7c0-0.3-0.1-0.6-0.3-0.8l-10-10c-0.2-0.2-0.5-0.3-0.8-0.3H13.8c-3.1,0-5.7,2.6-5.7,5.7v43.4
               c0,3.1,2.6,5.7,5.7,5.7h23.1 M43.2,9.6v6.6c0,1.5,0.6,3,1.7,4c1.1,1.1,2.3,1.7,4,1.7h6.6"/>
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M44.3,68.2v17c0,3.1,2.6,5.7,5.7,5.7h36c3.1,0,5.7-2.6,5.7-5.7v-38c0-0.3-0.1-0.6-0.3-0.8l-10-10
               c-0.2-0.2-0.5-0.3-0.8-0.3H55.4 M79.4,36v6.6c0,1.5,0.6,3,1.7,4c1.1,1.1,2.3,1.7,4,1.7h6.6"/>
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M39.2,24.1H17.6" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M39.2,32.4H17.6" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M82.1,66.7H60.6" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M82.1,75.1H60.6" />
                </g>
            </g>
            <g>
                <path class="st-1" d="M62.3,52.5c0,8.4-6.8,15.3-15.3,15.3S31.7,61,31.7,52.5S38.5,37.3,47,37.3c5.7,0,10.6,3.1,13.3,7.7" />
                <polyline class="st-1" points="38.9,52.8 45.6,58.8 65,40.7 	" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    DocSearch2: {
        image: <>
            <g>
                <circle class="st-0" cx="269.1" cy="882.5" r="41.2" />
                <g>
                    <path class="st-0" d="M276.9,898.1v-31.8 M291,898.1v-23.4c0-0.4-0.3-0.7-0.8-0.7h-13.3v-10.4c0-0.4-0.3-0.7-0.8-0.7h-23.7
               c-0.5,0-0.8,0.2-0.8,0.7v34.4"/>
                    <line class="st-0" x1="257.2" y1="871" x2="272" y2="871" />
                    <line class="st-0" x1="257.2" y1="877.5" x2="272" y2="877.5" />
                    <line class="st-0" x1="257.2" y1="884.1" x2="272" y2="884.1" />
                    <line class="st-0" x1="257.2" y1="891.2" x2="272" y2="891.2" />
                    <line class="st-0" x1="257.2" y1="896.9" x2="272" y2="896.9" />
                </g>
            </g>
            <path class="st-0" d="M67.5,40.3V9.7c0-0.9-0.5-1.6-1.1-1.6h-5l-5.3,0H40.7l-5.5,0H18.5l-3.7,0h-4.7c-0.9,0-1.6,0.7-1.6,1.6v80.7
       c0,0.9,0.7,1.6,1.6,1.6H66c0.9,0,1.6-0.7,1.6-1.6V71.8"/>
            <path class="st-1" d="M57.4,29.9H20.2" />
            <path class="st-1" d="M57.4,46.3H20.2" />
            <path class="st-1" d="M54.3,62.8H20.2" />
            <path class="st-1" d="M57.4,79.2H20.2" />
            <line class="st-1" x1="59.2" y1="6.1" x2="59.2" y2="14.4" />
            <line class="st-1" x1="38.1" y1="6.1" x2="38.1" y2="14.4" />
            <line class="st-1" x1="15.7" y1="6.1" x2="15.7" y2="14.4" />
            <line class="st-1" x1="82.8" y1="67.7" x2="95" y2="80.1" />
            <circle class="st-0" cx="71.3" cy="56.4" r="16.1" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    DocSearch: {
        image: <>
            <path class="st-0" d="M86.9,23.2L71.1,7.5C70.8,7.2,70.3,7,69.8,7H21.5c-5,0-9,4-9,9v68.4c0,5,4,9,9,9h56.9c5,0,9-4,9-9V24.6
       C87.4,24.1,87.2,23.6,86.9,23.2z M49.7,79.4c-14.3,0-25.8-11.6-25.8-25.8s11.6-25.8,25.8-25.8c14.3,0,25.8,11.6,25.8,25.8
       S64,79.4,49.7,79.4z"/>
            <line class="st-1" x1="68.2" y1="71.7" x2="87.8" y2="91.5" />
            <circle class="st-1" cx="49.7" cy="53.5" r="25.8" />
            <g>
                <g>
                    <path class="st-1" d="M87.8,67.8V24.4c0-0.5-0.2-1-0.5-1.3L71.4,7.2c-0.3-0.3-0.8-0.5-1.3-0.5H21.6c-5,0-9.1,4.1-9.1,9.1v69
               c0,5,4.1,9.1,9.1,9.1h43.8 M68.2,6.7v10.5c0,2.4,0.9,4.7,2.7,6.4c1.7,1.7,3.6,2.7,6.4,2.7h10.5"/>
                </g>
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    DocPointing: {
        image: <>
            <g>
                <circle class="st-0" cx="269.1" cy="882.5" r="41.2" />
                <g>
                    <path class="st-0" d="M276.9,898.1v-31.8 M291,898.1v-23.4c0-0.4-0.3-0.7-0.8-0.7h-13.3v-10.4c0-0.4-0.3-0.7-0.8-0.7h-23.7
               c-0.5,0-0.8,0.2-0.8,0.7v34.4"/>
                    <line class="st-0" x1="257.2" y1="871" x2="272" y2="871" />
                    <line class="st-0" x1="257.2" y1="877.5" x2="272" y2="877.5" />
                    <line class="st-0" x1="257.2" y1="884.1" x2="272" y2="884.1" />
                    <line class="st-0" x1="257.2" y1="891.2" x2="272" y2="891.2" />
                    <line class="st-0" x1="257.2" y1="896.9" x2="272" y2="896.9" />
                </g>
            </g>
            <path class="st-1" d="M68.6,9.2H21.7c-6.7,0-12.2,5.5-12.2,12.2v50.7l0,2.6v4.7c0,6.7,5.5,12.2,12.2,12.2h35.7v-0.5
       c0,0,0.5-8.8,0.5-10.1c0-1.3,2-33.8,2-33.8V28.3v-3.5v-3.5c0-4.8,3.9-8.7,8.7-8.7V9.2z"/>
            <line class="st-2" x1="59.9" y1="47.2" x2="59.9" y2="28.3" />
            <path class="st-2" d="M68.6,9.2H21.7c-6.7,0-12.2,5.5-12.2,12.2v50.7" />
            <path class="st-2" d="M9.5,74.6v4.7c0,6.7,5.5,12.2,12.2,12.2h35.7" />
            <path class="st-2" d="M59.9,24.8v-3.5c0-4.8,3.9-8.7,8.7-8.7" />
            <line class="st-2" x1="21.7" y1="32.2" x2="47.7" y2="32.2" />
            <line class="st-2" x1="21.7" y1="42.7" x2="40.5" y2="42.7" />
            <line class="st-2" x1="21.7" y1="55.4" x2="47.7" y2="55.4" />
            <line class="st-2" x1="21.7" y1="68.2" x2="42.1" y2="68.2" />
            <line class="st-2" x1="21.7" y1="80.9" x2="47.7" y2="80.9" />
            <g>
                <path class="st-0" d="M91.8,79.2c-0.2-1.4-3.1-15.4-5.1-19.4l-5.5-10.9c-1.3-2.6-4.5-3.7-7.1-2.4c-0.7,0.3-1.2,0.8-1.7,1.3
           c-1.6-1.4-3.9-1.8-5.9-0.8c-0.7,0.4-1.4,0.9-1.8,1.5c-1.6-1.1-4.6-0.9-6.5,0c-0.5,0.3-1,0.6-1.4,1l-5.5-11.1
           c-1.3-2.6-4.5-3.7-7.1-2.4c-2.6,1.3-3.7,4.5-2.4,7.1l12.3,24.7l-5.4-2.2c0,0-0.1,0-0.1,0c-1.3-0.4-2.8-0.4-4,0.3c0,0,0,0,0,0
           c-1.3,0.6-2.2,1.7-2.6,3c-0.8,2.3,0.3,4.7,2.9,6.5c3.4,2.3,6.9,4.3,10,6.1c2.3,1.3,4.4,2.6,6,3.6c1.4,0.9,8.1,5.4,8.1,5.5"/>
                <line class="st-0" x1="57" y1="49.8" x2="63.4" y2="62.6" />
                <line class="st-0" x1="64.9" y1="48.7" x2="70.8" y2="60.5" />
                <line class="st-0" x1="72.4" y1="47.7" x2="78" y2="58.8" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    DocBlankToFill: {
        image: <>
            <path class="st-0" d="M41.6,55.4H9.7c-2.9,0-5.3-2.4-5.3-5.3V10.8c0-2.9,2.4-5.3,5.3-5.3H37l10,10.6v34C47,53,44.6,55.4,41.6,55.4z"
            />
            <path class="st-0" d="M87.8,92.7H55.8c-2.9,0-5.3-2.4-5.3-5.3v-39c0-2.9,2.4-5.3,5.3-5.3h27.3l10,10.6v33.7
       C93.1,90.3,90.7,92.7,87.8,92.7z"/>
            <g>
                <g>
                    <path class="st-1" d="M92.6,52.6l-9-9c-0.2-0.2-0.5-0.3-0.7-0.3H55.3c-2.8,0-5.1,2.3-5.1,5.1v39.1c0,2.8,2.3,5.1,5.1,5.1h32.4
               c2.8,0,5.1-2.3,5.1-5.1V53.3C92.9,53.1,92.8,52.8,92.6,52.6z M81.8,43.3v5.9c0,1.4,0.5,2.7,1.5,3.6c1,1,2,1.5,3.6,1.5h5.9"/>
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M83.8,60.7H59.3" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M83.8,65.2H59.3" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M70.5,70.4H59.3" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M65.4,75.5h-6.1" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M65.7,78.8h-6.4" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M75,75.5h-6.1" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M75.2,78.8h-6.4" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M84.6,75.5h-6.1" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M84.8,78.8h-6.4" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M72.5,83.3H59.3" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M46.8,15.1l-9-9c-0.2-0.2-0.5-0.3-0.7-0.3H9.6c-2.8,0-5.1,2.3-5.1,5.1v39.1c0,2.8,2.3,5.1,5.1,5.1H42
               c2.8,0,5.1-2.3,5.1-5.1V15.8C47.1,15.6,47,15.3,46.8,15.1z M36.1,5.8v5.9c0,1.4,0.5,2.7,1.5,3.6c1,1,2,1.5,3.6,1.5h5.9"/>
                </g>
            </g>
            <path class="st-2" d="M34.3,74.8H42l0,0c0.9,0,1.7-0.8,1.7-1.7v-7.7" />
            <line class="st-2" x1="42.7" y1="73.8" x2="28.4" y2="59.5" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Desktop: {
        image: <>
            <g>
                <g>
                    <path class="st-0" d="M68.5,93.6h-17V82.3h31.9c9.6,0,13-6.7,13-13V24.5c0-9.6-6.7-13-13-13H16.5c-6.3,0-13,3.4-13,13v44.8
               c0,9.6,6.7,13,13,13h31.9v11.3H32.1"/>
                </g>
            </g>
            <path class="st-1" d="M33.4,66.6c10.9,0,19.8-8.9,19.8-19.8S44.3,27,33.4,27s-19.8,8.9-19.8,19.8S22.5,66.6,33.4,66.6z" />
            <path class="st-1" d="M33.4,55.3c4.7,0,8.5-3.8,8.5-8.5s-3.8-8.5-8.5-8.5s-8.5,3.8-8.5,8.5S28.7,55.3,33.4,55.3z" />
            <path class="st-1" d="M70.2,30h17.2" />
            <path class="st-1" d="M58.9,30h5.7" />
            <path class="st-1" d="M70.2,52.6h17.2" />
            <path class="st-1" d="M58.9,52.6h5.7" />
            <path class="st-1" d="M58.9,41.3h28.5" />
            <path class="st-1" d="M58.9,64h28.5" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Delivery: {
        image: <>

            <path class="st-0" d="M93.8,52.6H81.1c-0.2,0-0.4-0.2-0.4-0.4V37.6c0-0.2,0.2-0.4,0.4-0.4h12.7c0.2,0,0.4,0.2,0.4,0.4v14.7
       C94.2,52.4,94,52.6,93.8,52.6z"/>
            <path class="st-0" d="M93.8,31.4H81.1c-0.2,0-0.4-0.2-0.4-0.4V17.4c0-0.2,0.2-0.4,0.4-0.4h12.7c0.2,0,0.4,0.2,0.4,0.4v13.6
       C94.2,31.3,94,31.4,93.8,31.4z"/>
            <path class="st-0" d="M73.5,52.6H57.3c-0.2,0-0.4-0.2-0.4-0.4V42c0-0.2,0.2-0.4,0.4-0.4h16.2c0.2,0,0.4,0.2,0.4,0.4v10.3
       C73.9,52.4,73.7,52.6,73.5,52.6z"/>
            <path class="st-0" d="M69.4,35.1h-9.7c-2.1,0-3.8-1.7-3.8-3.8V12.5c0-2.1,1.7-3.8,3.8-3.8h9.7c2.1,0,3.8,1.7,3.8,3.8v18.9
       C73.2,33.4,71.5,35.1,69.4,35.1z"/>
            <path class="st-0" d="M38.2,82c0,0-2.9-7.6-12.4-7.7c-9.4-0.1-13.2,9.3-13.2,9.3h-4L4.2,81v-8.4H7v-18L23.6,28h26.2v26l1.1,4.2h43.4
       v24H90c0,0-2.1-7.6-11.8-7.6c-10,0-12.7,7.4-12.7,7.4H38.2z"/>
            <g>
                <path class="st-1" d="M16.7,53c0-4.4,3.1-6.7,7.5-6.7c2.1,0,4,0.8,5.4,2.1 M24.5,45.6c-2.4,0-4.3-1.9-4.3-4.3c0-2.4,1.9-4.3,4.3-4.3
           s4.3,1.9,4.3,4.3C28.9,43.6,26.9,45.6,24.5,45.6z"/>
            </g>
            <polyline class="st-1" points="39.9,28.1 28.2,53.8 7.3,53.8 " />
            <circle class="st-0" cx="25.8" cy="87.1" r="7.4" />
            <circle class="st-0" cx="77.6" cy="87.1" r="7.4" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    CommonDocs: {
        image: <>
            <g>
                <g>
                    <path class="st-0" d="M30,84.5c0,3.9,3.2,7.1,7,7.1h44.4c3.9,0,7-3.2,7-7.1V37.2c0-0.4-0.2-0.8-0.4-1l-4.3-4.5" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-0" d="M23,78.1c0,4,3.3,7.3,7.3,7.3h46c4,0,7.3-3.3,7.3-7.3V29.6c0-0.4-0.2-0.8-0.4-1.1l-4.9-5" />
                </g>
            </g>
            <path class="st-0" d="M78,21.7L65.3,8.9c-0.3-0.3-0.7-0.4-1.1-0.4h-39c-4,0-7.3,3.3-7.3,7.3v55.5c0,4,3.3,7.3,7.3,7.3h46
       c4,0,7.3-3.3,7.3-7.3V22.7C78.5,22.3,78.3,21.9,78,21.7z"/>
            <g>
                <g>
                    <path class="st-1" d="M65.6,33.1H30.9" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M65.6,39.6H30.9" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M46.8,46.9H30.9" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M39.6,54.2h-8.7" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M39.9,58.8h-9" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M53.1,54.2h-8.7" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M53.5,58.8h-9" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M66.7,54.2H58" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M67,58.8h-9" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M49.6,65.3H30.9" />
                </g>
            </g>
            <path class="st-1" d="M62.8,8.5v8.4c0,1.9,0.8,3.8,2.1,5.1c1.4,1.4,2.9,2.1,5.1,2.1h8.4" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    CasualUser: {
        image: <>
            <path class="st-0" d="M61.4,58.3c1.4-3.2,1.6-4.1,3-7.3c1.4-3.2,2.3-6.9,2.5-12.5c0.1-1.5,0-3.7,1.3-5.8c6.7-10.5-2.5-20.8-11.6-20.3
       c-9.7,0.6-9.5-1.7-18.6,3c-1,0.5-5.5,4.2-5.9,6.1c-1.5,2.3-1.2,2-2.5,6.4c-0.4,1.5,0.6,2.9,1.5,4.3c1.9,2.9,2.3,4.1,3.4,9.5
       c0.6,3.2,0.8,7,1.5,8.4c2,4,1.3,4,3.1,8"/>
            <path class="st-0" d="M21,70.9c-8.1,3.9-11.4,9.2-9.9,20.4c26.1,0,52.3,0,78.4,0c1.6-11.6-1.7-17-9.8-20.6" />
            <path class="st-0" d="M79.5,90.6c0-8.3,0-16.6,0-24.9c0-5.3-1.7-6.9-6.9-6.9c-14.8,0-29.7,0-44.5,0c-5.6,0-6.9,1.2-6.9,6.9
       c0,8.3,0,16.6,0,24.9"/>
            <path class="st-1" d="M67.3,33.7c-1.7-4.1-11.7-5-14.9-7.6c-8.2,5.8-11.1,1.6-18,9.5" />
            <path class="st-1" d="M39.7,40.3c0,6.4,0.6,7.1,4.8,7c3.7-0.1,3-2.6,3.2-4.8c0.2-2.5-0.7-3.4-3.2-3.2c-3.3,0.2-6.7,0-10.1,0" />
            <path class="st-1" d="M60.9,40.3c0,6.4-0.6,7.1-4.8,7c-3.7-0.1-3-2.6-3.2-4.8c-0.2-2.5,0.7-3.4,3.2-3.2c3.3,0.2,6.7,0,10.1,0" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Cart: {
        image: <>
            <g>
                <g>
                    <g>
                        <path class="st-0" d="M31.1,62.1l52.4-7.2c0.7,0,1.4-0.7,1.4-1.4l7.2-28.7c0,0,0-0.7-0.4-1.1c-0.4-0.4-0.7-0.7-1.4-0.7H22.1
                   l-1.8-9.3c0-0.7-1.1-1.4-1.8-1.4H7.7c-1.1,0-1.8,0.7-1.8,1.8s0.7,1.8,1.8,1.8h9.3l8.6,43.8c1.1,5.7,6.5,10,12.2,10h41.3"/>
                    </g>
                </g>
                <g>
                    <g>
                        <path class="st-0" d="M36.4,73.2c-5,0-9,3.9-9,9c0,5,3.9,9,9,9c5,0,9-3.9,9-9C45.4,77.1,41.5,73.2,36.4,73.2z" />
                    </g>
                </g>
                <g>
                    <g>
                        <path class="st-0" d="M72.3,73.2c-5,0-9,3.9-9,9c0,5,3.9,9,9,9c5,0,9-3.9,9-9S77.4,73.2,72.3,73.2z" />
                    </g>
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    CardPayment: {
        image: <>
            <g>
                <path class="st-0" d="M61.4,50.4H12.2c-2.5,0-4.6-2.1-4.6-4.6V12.2c0-2.5,2.1-4.6,4.6-4.6h61.1c2.5,0,4.6,2.1,4.6,4.6v9.7h0l0,0
           v23.9c0,0.3,0,0.5-0.1,0.8 M67.5,93.1V79.6h25.6v13.6 M68,77.9l-0.7-1.1c-3.7-6-3.9-13.5-0.4-19.6c0.3-0.6,0.2-1.3-0.2-1.8
           L54.3,41.8c-1.9-2-1.8-5.2,0.2-7.1c2-1.9,5.2-1.9,7.1,0.1l17.9,17.7 M78,22.6l10.2,9.8c3.2,3.2,4.9,7.4,5,11.9v33.6"/>
                <path class="st-1" d="M73.9,83v3.4h-3.2" />
            </g>
            <line class="st-0" x1="76.3" y1="49.1" x2="79.1" y2="45.6" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Cal: {
        image: <>
            <rect x="13.2" y="12.4" class="st-0" width="75" height="75" />
            <rect x="25.6" y="65.4" class="st-1" width="10.9" height="10.9" />
            <rect x="45.2" y="65.4" class="st-1" width="10.9" height="10.9" />
            <rect x="64.9" y="65.4" class="st-1" width="10.9" height="10.9" />
            <rect x="45.2" y="45.8" class="st-1" width="10.9" height="10.9" />
            <rect x="64.9" y="45.8" class="st-1" width="10.9" height="10.9" />
            <rect x="25.6" y="45.8" class="st-1" width="10.9" height="10.9" />
            <rect x="23.3" y="25.4" class="st-1" width="52.6" height="10.9" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    Buyer: {
        image: <>
            <path class="st-0" d="M58.7,71.3c10.1,0,20.1,0,30.2,0c1.3,0,1.8-0.4,2-1.7c0.6-3.1,2-15.4,2-15.4H61.1" />
            <path class="st-1" d="M58.7,71.3c10.1,0,20.1,0,30.2,0c1.3,0,1.8-0.4,2-1.7c0.6-3.1,2-15.4,2-15.4H61.1" />
            <path class="st-0" d="M48.8,47.5c-4.8-2.2-9.6-4.3-14.5-6.5C34.1,41,34,41,33.6,40.9c0,0.7,0,1.3,0,1.9c0,11.8,0,23.6,0,35.4
       c0,2.7-0.5,5-3,6.3c-2.5,1.3-4.7,0.6-6.6-1c-1,0.5-1.8,1.1-2.7,1.4c-3.5,1.2-7.1-1.4-7.2-5.3c-0.1-4.9,0-9.8,0-14.7
       c0-0.6,0-1.3,0-1.9c-5.3-1.2-7-3.4-7-8.7c0-3.5,0-7,0-10.5c0-7.7,2.3-11.3,9.5-14.3c-2.9-2.9-4.4-6.2-3.8-10.3c0.4-2.8,1.8-5.2,4-7
       c4.4-3.6,10.5-3.4,14.7,0.5c4.6,4.3,4.7,9.8,0.2,16.4c7.3,1.7,13.5,6,20.2,9.2c3.2,1.5,3.7,5.4,1.1,7.8"/>
            <path class="st-1" d="M57.7,67.2c-0.1-0.4-8.5-19.6-8.9-19.7c-4.8-2.2-9.6-4.3-14.5-6.5C34.1,41,34,41,33.6,40.9c0,0.7,0,1.3,0,1.9
       c0,11.8,0,23.6,0,35.4c0,2.7-0.5,5-3,6.3c-2.5,1.3-4.7,0.6-6.6-1c-1,0.5-1.8,1.1-2.7,1.4c-3.5,1.2-7.1-1.4-7.2-5.3
       c-0.1-4.9,0-9.8,0-14.7c0-0.6,0-1.3,0-1.9c-5.3-1.2-7-3.4-7-8.7c0-3.5,0-7,0-10.5c0-7.7,2.3-11.3,9.5-14.3
       c-2.9-2.9-4.4-6.2-3.8-10.3c0.4-2.8,1.8-5.2,4-7c4.4-3.6,10.5-3.4,14.7,0.5c4.6,4.3,4.7,9.8,0.2,16.4c7.3,1.7,13.5,6,20.2,9.2
       c3.2,1.5,3.7,5.4,1.1,7.8"/>
            <circle class="st-2" cx="67" cy="79" r="3.5" />
            <circle class="st-2" cx="81.7" cy="79" r="3.5" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    BusinessMan: {
        image: <>
            <g>
                <g>
                    <path class="st-0" d="M86.9,66.6C86.9,66.6,86.9,66.6,86.9,66.6l0.1,0L67.7,79.8l-9-6c-0.5-0.3-1.2-0.5-2-0.5c-0.8,0-1.5,0.2-2,0.4
               L40,82.3l-10.8-9.4c-0.5-0.4-1.3-0.6-2.2-0.6c-0.9,0-1.7,0.2-2.2,0.6L7,87.6"/>
                </g>
            </g>
            <polyline class="st-1" points="6.7,50.3 6.7,93.7 93.5,93.7 " />
            <g>
                <g>
                    <g>
                        <g>
                            <ellipse class="st-1" cx="50.2" cy="18.3" rx="11.4" ry="13.2" />
                        </g>
                    </g>
                </g>
                <polyline class="st-1" points="48.7,38.7 45.7,61.4 50.2,66.4 54.8,61.9 52.3,38.7 	" />
                <path class="st-1" d="M34.4,46H17.8c-3.3,0-6-2.7-6-6v0c0-3.3,2.7-6,6-6h43.3" />
                <path class="st-1" d="M61.2,34h20.1c3.3,0,6,2.7,6,6v0c0,3.3-2.7,6-6,6H65.9" />
                <line class="st-1" x1="34.5" y1="46.2" x2="31.2" y2="58" />
                <line class="st-1" x1="65.9" y1="46.1" x2="68.3" y2="57.9" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    BusinessDeveloper: {
        image: <>
            <circle class="st-0" cx="50.5" cy="31.4" r="22.8" />
            <polyline class="st-1" points="5.1,75.5 22.7,57.9 31.6,66.8 40.2,58.2 " />
            <polyline class="st2" points="81.7,30.5 93.1,30.5 74.2,50.5 " />
            <line class="st-1" x1="93.4" y1="42.5" x2="93.4" y2="31.3" />
            <path class="st3" d="M89.7,91h-8.3c-0.2,0-0.4-0.2-0.4-0.4v-30c0-0.2,0.2-0.4,0.4-0.4h8.3c0.2,0,0.4,0.2,0.4,0.4v30
       C90.1,90.8,89.9,91,89.7,91z"/>
            <path class="st3" d="M72.5,91h-8.3c-0.2,0-0.4-0.2-0.4-0.4V72.8c0-0.2,0.2-0.4,0.4-0.4h8.3c0.2,0,0.4,0.2,0.4,0.4v17.8
       C72.9,90.8,72.7,91,72.5,91z"/>
            <path class="st3" d="M55,91h-8.3c-0.2,0-0.4-0.2-0.4-0.4V66.9c0-0.2,0.2-0.4,0.4-0.4H55c0.2,0,0.4,0.2,0.4,0.4v23.7
       C55.4,90.8,55.3,91,55,91z"/>
            <path class="st3" d="M37.5,91h-8.3c-0.2,0-0.4-0.2-0.4-0.4V78.3c0-0.2,0.2-0.4,0.4-0.4h8.3c0.2,0,0.4,0.2,0.4,0.4v12.3
       C37.9,90.8,37.8,91,37.5,91z"/>
            <path class="st3" d="M20.4,91h-8.3c-0.2,0-0.4-0.2-0.4-0.4v-6.7c0-0.2,0.2-0.4,0.4-0.4h8.3c0.2,0,0.4,0.2,0.4,0.4v6.7
       C20.8,90.8,20.6,91,20.4,91z"/>
            <path class="st-1" d="M61.8,45H39.2c-0.3,0-0.6-0.3-0.6-0.6v-4.9c0-4.5,3.7-8.2,8.2-8.2h6.8c4.9,0,8.9,4,8.9,8.9v4.2
       C62.4,44.7,62.1,45,61.8,45z"/>
            <line class="st-1" x1="43.7" y1="40.2" x2="43.7" y2="44" />
            <line class="st-1" x1="57.2" y1="40.2" x2="57.2" y2="44" />
            <ellipse class="st-1" cx="50.6" cy="22.2" rx="5.8" ry="6.8" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    BanDoc: {
        image: <>
            <path class="st-0" d="M78.1,91.6H23.8c-5,0-9-4-9-8.9V16.8c0-4.9,4.1-8.9,9-8.9h46.4l16.9,17.8v57C87.1,87.6,83.1,91.6,78.1,91.6z" />
            <g>
                <g>
                    <path class="st-1" d="M87.1,46.9V25.2c0-0.5-0.2-0.9-0.5-1.3L71.4,8.8c-0.3-0.3-0.8-0.5-1.3-0.5H23.8c-4.8,0-8.7,3.9-8.7,8.7v66
               c0,4.8,3.9,8.7,8.7,8.7h8.7 M68.4,8.3v10c0,2.3,0.9,4.5,2.5,6.1c1.6,1.6,3.5,2.5,6.1,2.5h10"/>
                </g>
            </g>
            <g>
                <g>
                    <path class="st-2" d="M57.6,40.5c-13.1,0-23.7,10.6-23.7,23.7s10.6,23.7,23.7,23.7s23.7-10.6,23.7-23.7S70.6,40.5,57.6,40.5z" />
                </g>
                <line class="st-2" x1="65.4" y1="56" x2="49.8" y2="72.4" />
                <line class="st-2" x1="49.8" y1="56" x2="65.4" y2="72.4" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BUSINESS],
    },
    SandFilter: {
        image: <>
            <g>
                <polyline class="st-0" points="55.5,51.3 87.8,94.8 11.5,95 43.9,51.4 	" />
                <polyline class="st-0" points="44.1,51.2 11.5,7.2 87.8,7 55.3,51 	" />
                <line class="st-0" x1="32.9" y1="21.5" x2="67" y2="21.5" />
                <line class="st-0" x1="36.3" y1="29.1" x2="63.7" y2="29.1" />
                <line class="st-0" x1="40.3" y1="37.5" x2="59.7" y2="37.5" />
                <line class="st-0" x1="50.2" y1="47.3" x2="50.2" y2="56.5" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.FLOWCHART],
    },
    CloudDevice: {
        image: <>
            <path class="st-0" d="M24.7,85.8c-9.8,0.2-18.2-7.9-19.8-19c-0.8-6.5,0.8-13,4.5-18c3.7-4.9,9.1-7.8,14.7-7.8c0.1,0,0.3,0,0.3,0
       c1.1,0,2-0.9,2.1-2.1c1.6-11.4,9.3-20.4,19.2-22.4s19.8,3.3,24.7,13.3c0.4,0.7,1.1,1.2,1.8,1.2c6.5,0.2,12.6,3.5,16.9,9.1
       c4.3,5.6,6.5,13,5.9,20.5C93.9,75.1,83.3,86,70.8,85.8"/>
            <g>
                <g>
                    <path class="st-0" d="M62.4,60.5H35.1c-3.7,0-6.7,3.4-6.7,7.6v10.1c0,4.2,3,7.6,6.7,7.6h27.4c3.7,0,6.7-3.4,6.7-7.6V68.1
               C69.2,63.9,66.2,60.5,62.4,60.5z"/>
                </g>
            </g>
            <g>
                <path class="st-0" d="M65.1,71.9c-0.4-2.7-2.7-4.5-5.1-4c-1.1,0.2-2.1,1-2.8,2c-0.7,1.1-0.9,2.4-0.7,3.7c0.4,2.4,2.2,4.1,4.3,4.1
           c0.2,0,0.5,0,0.7-0.1c1.1-0.2,2.2-0.9,2.8-2C65,74.5,65.3,73.2,65.1,71.9z"/>
            </g>
            <g>
                <g>
                    <path class="st-0" d="M46.8,73H28.5" />
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.FLOWCHART],
    },
    CircleArrowUp: {
        image: <>
            <g>
                <circle class="st-0" cx="50.3" cy="50.4" r="46.6" />
                <polyline class="st-1" points="32.8,57.5 50.3,43.2 67.8,57.5 	" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.FLOWCHART],
    },
    CircleArrowRight: {
        image: <>
            <g>
                <circle class="st-0" cx="50.3" cy="50.4" r="46.6" />
                <polyline class="st-1" points="43.2,32.9 57.4,50.4 43.2,67.9 	" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.FLOWCHART],
    },
    CircleArrowLeft: {
        image: <>
            <g>
                <circle class="st-0" cx="50.3" cy="50.4" r="46.6" />
                <polyline class="st-1" points="57.4,67.9 43.2,50.4 57.4,32.9 	" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.FLOWCHART],
    },
    CircleArrowDown: {
        image: <>
            <g>
                <circle class="st-0" cx="50.3" cy="50.4" r="46.6" />
                <polyline class="st-1" points="67.8,43.2 50.3,57.5 32.8,43.2 	" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.FLOWCHART],
    },
    Cylinder: {
        image: <>
            <path class="st-0" d="M93.6,75.2C93.6,75.1,93.6,75.1,93.6,75.2l0-49.6c0-2.1-1.7-3.9-3.9-3.9H10.9c-2.1,0-3.9,1.7-3.9,3.9v49.6
       c0,0.6,0.1,1.1,0.4,1.6c2.4,7,20.7,12.4,43,12.4C74.2,89.1,93.6,82.9,93.6,75.2C93.6,75.2,93.6,75.2,93.6,75.2z"/>
            <ellipse class="st-0" cx="50.3" cy="24" rx="43.3" ry="13.7" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.FLOWCHART],
    },
    Chemicals: {
        image: <>
            <g>
                <circle class="st-0" cx="269.1" cy="882.5" r="41.2" />
                <g>
                    <path class="st-0" d="M276.9,898.1v-31.8 M291,898.1v-23.4c0-0.4-0.3-0.7-0.8-0.7h-13.3v-10.4c0-0.4-0.3-0.7-0.8-0.7h-23.7
               c-0.5,0-0.8,0.2-0.8,0.7v34.4"/>
                    <line class="st-0" x1="257.2" y1="871" x2="272" y2="871" />
                    <line class="st-0" x1="257.2" y1="877.5" x2="272" y2="877.5" />
                    <line class="st-0" x1="257.2" y1="884.1" x2="272" y2="884.1" />
                    <line class="st-0" x1="257.2" y1="891.2" x2="272" y2="891.2" />
                    <line class="st-0" x1="257.2" y1="896.9" x2="272" y2="896.9" />
                </g>
            </g>
            <path class="st-0" d="M36.8,33.1c0,4.3-0.8,8.8,0.2,12.8c1.1,4.4,3.8,8.4,5.8,12.6c3.6,7.5,7,15.1,10.9,22.4
       c3.4,6.4-1.3,12.2-7.6,12.1c-10.8-0.2-21.6,0-32.4-0.1c-7.2,0-10.6-5.4-7.5-12c2.7-5.8,5.6-11.6,8.4-17.4c2.6-5.3,5.1-10.6,7.8-15.9
       c0.5-1,0.5-2,0.6-3c0-3.9,0-7.8,0-11.7"/>
            <path class="st-1" d="M50,82.9c1.7,3.3,0.2,5.7-3.6,5.7c-11.3,0-22.6,0-33.9,0" />
            <path class="st-1" d="M12.2,88.6c-3.3-1.7-3.7-2.8-2.1-6c1.9-3.7,4-7.3,5.6-11.1" />
            <circle class="st-1" cx="32.5" cy="56.6" r="3.1" />
            <circle class="st-1" cx="25.7" cy="69" r="4.9" />
            <circle class="st-1" cx="40.4" cy="77.2" r="7.3" />
            <path class="st-0" d="M37.8,32.3H21.3c-2.3,0-4.1-1.9-4.1-4.1v0c0-2.3,1.9-4.1,4.1-4.1h16.6c2.3,0,4.1,1.9,4.1,4.1v0
       C42,30.4,40.1,32.3,37.8,32.3z"/>
            <path class="st-0" d="M74.6,84.3c-1.5,1.4-3.6,2.3-5.8,2.3h0c-4.7,0-8.6-3.9-8.6-8.6V35.2" />
            <line class="st-0" x1="77.4" y1="35.2" x2="77.4" y2="73.6" />
            <path class="st-0" d="M76.4,35.3H61.1c-1.9,0-3.5-1.6-3.5-3.5v0c0-1.9,1.6-3.5,3.5-3.5h15.4c1.9,0,3.5,1.6,3.5,3.5v0
       C79.9,33.7,78.3,35.3,76.4,35.3z"/>
            <path class="st-1" d="M28.6,23.9c0,0,0-4.7,0-7.9s-1.9-7.5,7.5-7.5s26.2,0,26.2,0s5.2-0.8,5.2,5.2s0,14,0,14" />
            <path class="st-1" d="M72.5,27.7c0,0,0-8.5,0-11.7s-0.8-7.5,3.2-7.5c4,0,6.2,0,6.2,0s6.5-0.8,6.5,5.2s0,6.9,0,6.9" />
            <line class="st-0" x1="60.2" y1="52.2" x2="77" y2="52.2" />
            <path class="st-0" d="M93.8,17.6v28.3c0,3.1-2.6,5.7-5.7,5.7h0c-3.1,0-5.7-2.6-5.7-5.7V17.6" />
            <path class="st-0" d="M93.2,17.6H83c-1.3,0-2.3-1-2.3-2.3v0c0-1.3,1-2.3,2.3-2.3h10.2c1.3,0,2.3,1,2.3,2.3v0
       C95.5,16.6,94.4,17.6,93.2,17.6z"/>
            <line class="st-0" x1="82.4" y1="28.9" x2="93.5" y2="28.9" />
            <polygon class="st-0" points="81.7,65.5 86,74.3 95.8,75.7 88.7,82.6 90.4,92.4 81.7,87.8 72.9,92.4 74.6,82.6 67.5,75.7 77.3,74.3 
       "/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.CALLOUT],
    },
    DOC: {
        image: <>

            <path class="st-0" d="M86,23L70.6,7c-0.3-0.4-0.8-0.5-1.3-0.5H22.1c-4.9,0-8.8,4.1-8.8,9.1V85c0,5,4,9.1,8.8,9.1h55.6
       c4.9,0,8.8-4.1,8.8-9.1V24.3C86.5,23.8,86.3,23.3,86,23z"/>
            <path class="st-1" d="M67.5,6.5V17c0,2.4,0.9,4.7,2.6,6.4c1.7,1.7,3.5,2.7,6.2,2.7h10.2" />
            <g>
                <g>
                    <path class="st-1" d="M73.3,40.2H51.1" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-1" d="M73.3,66.7H51.1" />
                </g>
            </g>
            <circle class="st-1" cx="35.4" cy="41.3" r="8.1" />
            <circle class="st-1" cx="35.4" cy="67.7" r="8.1" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.CALLOUT],
    },
    DialogBubble2: {
        image: <>
            <path class="st-0" d="M78.1,91.8H29.4c-7.9,0-14.4-6.5-14.4-14.4V24.6c0-7.9-12.7-14.4-4.8-14.4h67.9c7.9,0,14.4,6.5,14.4,14.4v52.8
       C92.5,85.3,86,91.8,78.1,91.8z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.CALLOUT],
    },
    DialogBubble: {
        image: <>
            <path class="st-0" d="M9.4,8.6h81.8c2,0,3.6,1.6,3.6,3.6v71.5c0,2-1.6,3.6-2.6,3.6l-35.5,0l-6.4,6l-6.4-6l-34.5,0
       c-2,0-3.6-1.6-3.6-3.6V12.2C5.8,10.2,7.4,8.6,9.4,8.6z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.CALLOUT],
    },
    CommonCircle: {
        image: <>
            <path class="st-0" d="M50,92.8L50,92.8C26.4,92.8,7.2,73.6,7.2,50v0C7.2,26.4,26.4,7.2,50,7.2h0c23.6,0,42.8,19.1,42.8,42.8v0
       C92.8,73.6,73.6,92.8,50,92.8z"/>
            <circle class="st-1" cx="50" cy="50" r="36.3" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.CALLOUT],
    },
    CommonBadge2: {
        image: <>
            <g>
                <path class="st-0" d="M70.1,66c9-8.6,19.4-8.2,19.5-8.6c0.4-2.4,0.7-4.8,0.7-7.3c0-22.2-18-40.3-40.3-40.3C27.8,9.7,9.7,27.8,9.7,50
           c0,22.2,18,40.3,40.3,40.3c3.3,0,6.6-0.4,9.7-1.2C60.1,88.1,60.4,75.3,70.1,66z"/>
                <path d="M69.2,67c-7.5,7.5-8.7,22-9,22.7c7.9-6.8,22.9-22.5,30-31.9C88.9,58.1,77.6,58.6,69.2,67z" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.CALLOUT],
    },
    Cloud: {
        image: <>
            <g>
                <path class="st-0" d="M71.4,25.7c-2.2,0-4.3,0.2-6.3,0.6c-3.5-4.9-10.5-8.2-18.7-8.2c-10.2,0-18.6,5.2-20.6,12.1
           c-1.7-1.3-3.9-2-6.2-2c-5.5,0-10,4.2-10,9.4c0,4.5,3.4,8.3,8,9.2c-0.1,0.8-0.2,1.5-0.2,2.3c0,10.2,9.9,18.4,22.1,18.4
           c8.3,0,15.5-3.8,19.3-9.5c3.6,1.7,8,2.8,12.6,2.8c12.9,0,23.4-7.8,23.4-17.5C94.9,33.6,84.4,25.7,71.4,25.7z"/>
                <ellipse class="st-0" cx="25.2" cy="72.9" rx="7.1" ry="5.5" />
                <ellipse class="st-0" cx="11.4" cy="78" rx="4.2" ry="3.3" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.CALLOUT],
    },
    ChatBubble: {
        image: <>
            <g>
                <circle class="st-0" cx="269.1" cy="882.5" r="41.2" />
                <g>
                    <path class="st-0" d="M276.9,898.1v-31.8 M291,898.1v-23.4c0-0.4-0.3-0.7-0.8-0.7h-13.3v-10.4c0-0.4-0.3-0.7-0.8-0.7h-23.7
               c-0.5,0-0.8,0.2-0.8,0.7v34.4"/>
                    <line class="st-0" x1="257.2" y1="871" x2="272" y2="871" />
                    <line class="st-0" x1="257.2" y1="877.5" x2="272" y2="877.5" />
                    <line class="st-0" x1="257.2" y1="884.1" x2="272" y2="884.1" />
                    <line class="st-0" x1="257.2" y1="891.2" x2="272" y2="891.2" />
                    <line class="st-0" x1="257.2" y1="896.9" x2="272" y2="896.9" />
                </g>
            </g>
            <g>
                <g>
                    <path class="st-0" d="M20.3,92c-1,0-1.8-0.2-2.6-0.6c-3.8-2.1-2.5-7.5-1.4-12.2c0.5-2.1,1.4-6,0.8-6.8c-6-7-9.3-15.8-9.3-24.8
               C7.9,25.8,26.8,8,50,8s42.1,17.8,42.1,39.6S73.2,87.2,50,87.2c-3.2,0-6.5-0.3-9.6-1c-1.2-0.3-5.8,1.5-8.9,2.7
               C26.5,90.7,22.9,92,20.3,92z"/>
                </g>
                <g>
                    <line class="st-0" x1="30.9" y1="33.1" x2="67.9" y2="33.1" />
                </g>
                <g>
                    <line class="st-0" x1="25.6" y1="47.1" x2="72.2" y2="47.1" />
                </g>
                <g>
                    <line class="st-0" x1="35.8" y1="61.1" x2="60.9" y2="61.1" />
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.CALLOUT],
    },
    CalloutSquare: {
        image: <>
            <path class="st-0" d="M85.8,20.3H15.1c-3.9,0-7.2,3.2-7.2,7.2v42.7c0,3.9,3.2,7.2,7.2,7.2h6.9l8.7,8.7l8.7-8.7h46.4
       c3.9,0,7.2-3.2,7.2-7.2V27.5C93,23.6,89.8,20.3,85.8,20.3z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.CALLOUT],
    },
    CalloutRounded: {
        image: <>
            <path class="st-0" d="M83.6,15H17.8c-4.7,0-8.5,3.8-8.5,8.5V67c0,4.7,3.8,8.5,8.5,8.5h26.1v6.6h-4.3l11.1,11.1l11.1-11.1h-4.3v-6.6
       h26.1c4.7,0,8.5-3.8,8.5-8.5V23.5C92,18.8,88.2,15,83.6,15z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.CALLOUT],
    },
    CalloutRadius: {
        image: <>
            <path class="st-0" d="M67,10.8H33.3C19.6,10.8,8.4,22,8.4,35.7v20.7c0,10,6,18.7,14.6,22.6v11.5l9.2-9.2c0.4,0,0.7,0,1.1,0H67
       c13.7,0,24.9-11.2,24.9-24.9V35.7C91.9,22,80.7,10.8,67,10.8z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.CALLOUT],
    },
    CalloutOval: {
        image: <>
            <path class="st-0" d="M50.1,19.2c-23.6,0-42.8,11.2-42.8,25c0,8.8,7.8,16.5,19.5,20.9L14.3,82.5l22.2-14.6c4.3,0.8,8.8,1.3,13.5,1.3
       c23.6,0,42.8-11.2,42.8-25C92.9,30.4,73.7,19.2,50.1,19.2z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.CALLOUT],
    },
    Badge: {
        image: <>
            <path class="st-0" d="M65.9,38.1C65.9,46.9,58.8,54,50,54s-15.9-7.1-15.9-15.9S41.2,22.2,50,22.2C58.8,22.2,65.9,29.3,65.9,38.1z
        M81.8,38.1c0,17.6-14.2,31.8-31.8,31.8S18.2,55.6,18.2,38.1S32.5,6.3,50,6.3C67.5,6.3,81.8,20.5,81.8,38.1z M69.9,38.1
       c0-11-8.9-19.9-19.9-19.9s-19.9,8.9-19.9,19.9S39,57.9,50,57.9C61,57.9,69.9,49,69.9,38.1z M21.1,59l-8.7,26.1
       c-0.3,1,0.2,2.2,1.3,2.5c0.3,0.1,0.6,0.1,0.9,0.1l13.1-1.9l9.3,7.4c0.9,0.7,2.1,0.5,2.8-0.3c0.1-0.1,0.2-0.2,0.2-0.4l9.4-18.8
       C38.1,73.6,27.6,68.1,21.1,59L21.1,59z M87.6,85.1L78.9,59c-6.6,9.1-17,14.6-28.2,14.8l9.4,18.8c0.5,1,1.7,1.4,2.7,0.9
       c0.1-0.1,0.2-0.1,0.4-0.2l9.3-7.4l13.1,1.9c1.1,0.2,2.1-0.6,2.3-1.7C87.8,85.7,87.7,85.4,87.6,85.1z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.CALLOUT],
    },
    Sun: {
        image: <>
            <g>
                <circle class="st-0" cx="49.9" cy="49.4" r="23" />
                <g>
                    <line class="st-1" x1="49.9" y1="5.5" x2="49.9" y2="16.6" />
                    <line class="st-1" x1="93.4" y1="49.7" x2="82.3" y2="49.7" />
                    <line class="st-1" x1="49.2" y1="93.3" x2="49.2" y2="82.1" />
                    <line class="st-1" x1="5.6" y1="49" x2="16.8" y2="49" />
                </g>
                <g>
                    <line class="st-1" x1="71.5" y1="11.3" x2="66" y2="21" />
                    <line class="st-1" x1="87.5" y1="71.3" x2="77.8" y2="65.8" />
                    <line class="st-1" x1="27.6" y1="87.4" x2="33.1" y2="77.7" />
                    <line class="st-1" x1="11.5" y1="27.4" x2="21.2" y2="32.9" />
                </g>
                <g>
                    <line class="st-1" x1="87.6" y1="27.5" x2="78" y2="33.1" />
                    <line class="st-1" x1="71.4" y1="87.4" x2="65.7" y2="77.8" />
                    <line class="st-1" x1="11.4" y1="71.2" x2="21.1" y2="65.6" />
                    <line class="st-1" x1="27.7" y1="11.3" x2="33.3" y2="20.9" />
                </g>
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    Scale: {
        image: <>
            <path class="st0" d="M89.4,30.4v-17l0,0c0-2-1.7-3.7-3.7-3.7h-17" />
            <path class="st0" d="M64.9,24.5l-12-12l0,0c-1.4-1.4-3.8-1.4-5.2,0l-12,12" />
            <path class="st0" d="M10,68.5v17l0,0c0,2,1.7,3.7,3.7,3.7h17" />
            <path class="st0" d="M28.9,69.8L11.1,87.6" />
            <path class="st0" d="M87.2,11.2L66.7,31.6" />
            <path class="st0" d="M68.8,90.4h17l0,0c2,0,3.7-1.7,3.7-3.7v-17" />
            <path class="st0" d="M30.6,11h-17l0,0c-2,0-3.7,1.7-3.7,3.7v17" />
            <path class="st0" d="M31.6,32.6l-20-20" />
            <path class="st0" d="M88.1,89L68.6,69.5" />
            <line class="st0" x1="50" y1="11.6" x2="50" y2="31.8" />
            <path class="st0" d="M35.8,76.7l12,12l0,0c1.4,1.4,3.8,1.4,5.2,0l12-12" />
            <line class="st0" x1="50.7" y1="89.7" x2="50.7" y2="69.4" />
            <path class="st0" d="M75.9,63.4l12-12l0,0c1.4-1.4,1.4-3.8,0-5.2l-12-12" />
            <line class="st0" x1="88.8" y1="48.4" x2="68.5" y2="48.4" />
            <path class="st0" d="M22.9,33.8l-12,12l0,0c-1.4,1.4-1.4,3.8,0,5.2l12,12" />
            <line class="st0" x1="9.9" y1="48.8" x2="30.2" y2="48.8" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    Square: {
        image: <>
            <g>
                <g>
                    <line class="st-0" x1="27.2" y1="50" x2="72.8" y2="50" />
                    <line class="st-0" x1="50" y1="27.2" x2="50" y2="72.8" />
                </g>
                <rect x="5.6" y="5.6" class="st1" width="88.8" height="88.8" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    PlusCircle: {
        image: <>
            <g>
                <circle class="st-0" cx="50" cy="50" r="45.9" />
                <g>
                    <line class="st-1" x1="30.7" y1="50" x2="69.3" y2="50" />
                    <line class="st-1" x1="50" y1="30.7" x2="50" y2="69.3" />
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    Enlarge: {
        image: <>
            <path class="st-0" d="M42.3,10.6H15.4c-2.7,0-4.9,2.2-4.9,4.9v68.6c0,2.7,2.2,4.9,4.9,4.9h68.6c2.7,0,4.9-2.2,4.9-4.9v-27" />
            <path class="st-1" d="M88.8,37.6V13.1l0,0c0-1.3-1.1-2.4-2.4-2.4H61.9" />
            <path class="st-0" d="M88.2,11.6L37.5,62.3" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    DBUser: {
        image: <>
            <g>
                <path class="st-0" d="M91.7,60.1v2V41v-0.8V20.7v-0.8c0-0.3-0.1-0.6-0.2-0.8c-1.9-7-15.9-13.8-40.3-13.8s-38.4,6.8-40.3,13.8
           c-0.1,0.2-0.2,0.5-0.2,0.8v0.8v19.5V41v18.7v0.8v19.5c0,0.3,0.1,0.5,0.2,0.7c1.9,7.9,19.1,13.9,40.4,13.9"/>
            </g>
            <circle class="st-0" cx="62.7" cy="66.4" r="29.4" />
            <path class="st-0" d="M91.2,18.4c0,6.2-16.5,13.1-40.1,13.1S11,24.6,11,18.4" />
            <path class="st-0" d="M37.8,50.9C21.5,48.9,11,43.5,11,38.6" />
            <path class="st-0" d="M91.2,38.6c0,2.5-2.6,5.1-7.3,7.3" />
            <path class="st-0" d="M32.1,70.2C19.1,67.8,11,63.1,11,58.8" />
            <g>
                <path class="st-0" d="M44.6,84.7c0-9.9,8-17.9,17.9-17.9s17.9,8,17.9,17.9 M63.4,65.2c-5.4,0-9.8-4.4-9.8-9.8s4.4-9.8,9.8-9.8
           s9.8,4.4,9.8,9.8S68.8,65.2,63.4,65.2z"/>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    DataOk: {
        image: <>
            <g>
                <path class="st-0" d="M87.3,58.4v1.9V39.9v-0.8V20.3v-0.8c0-0.3-0.1-0.5-0.2-0.8C85.3,12,71.7,5.4,48,5.4S10.8,12,9,18.8
           c-0.1,0.2-0.2,0.5-0.2,0.8v0.8v18.8v0.8V58v0.8v18.8c0,0.3,0.1,0.5,0.2,0.7C10.8,86,27.4,91.8,48,91.8c5,0,12.3-1,16.9-1.6"/>
            </g>
            <g>
                <circle class="st-0" cx="75.1" cy="74.5" r="18.5" />
                <g>
                    <polyline class="st1" points="67.4,76.1 74.3,80.8 85.4,64.9 		" />
                </g>
            </g>
            <path class="st-1" d="M86.9,18.1c0,6-16,12.7-38.9,12.7S9.2,24.1,9.2,18.1" />
            <path class="st-1" d="M86.9,37.6c0,6-16,12.7-38.9,12.7S9.2,43.6,9.2,37.6" />
            <path class="st-1" d="M57.7,69.4c-3,0.3-6.3,0.4-9.7,0.4c-22.9,0-38.9-6.7-38.9-12.7" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    Data: {
        image: <>
            <path class="st-0" d="M71.9,36.8c10.8,0,19-4.2,19-9.8s-8.1-9.8-19-9.8s-19,4.2-19,9.8C52.9,32.6,61.1,36.8,71.9,36.8z" />
            <path class="st-1" d="M53.5,40.2c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
            <path class="st-1" d="M53.5,50.9c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
            <path class="st-1" d="M53.5,61.5c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
            <path class="st-1" d="M53.5,72.2c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
            <path class="st-1" d="M53.5,82.9c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
            <path class="st-0" d="M28.5,59.5c10.8,0,19-4.2,19-9.8s-8.1-9.8-19-9.8s-19,4.2-19,9.8C9.5,55.3,17.7,59.5,28.5,59.5z" />
            <path class="st-1" d="M10.1,61.5c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
            <path class="st-1" d="M10.1,72.2c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
            <path class="st-1" d="M10.1,82.9c2,4.4,9.4,7.3,18.4,7.3c4.3,0,8.4-0.7,11.7-2c3.6-1.4,6-3.4,6.9-5.8" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    DashedLine: {
        image: <>
            <g>
                <g>
                    <polyline class="st-0" points="90.7,74.5 90.7,77 88.2,77 		" />
                    <line class="st-1" x1="83.1" y1="77" x2="14.3" y2="77" />
                    <polyline class="st-0" points="11.8,77 9.3,77 9.3,74.5 		" />
                    <line class="st-2" x1="9.3" y1="69.1" x2="9.3" y2="28.2" />
                    <polyline class="st-0" points="9.3,25.5 9.3,23 11.8,23 		" />
                    <line class="st-1" x1="16.9" y1="23" x2="85.7" y2="23" />
                    <polyline class="st-0" points="88.2,23 90.7,23 90.7,25.5 		" />
                    <line class="st-2" x1="90.7" y1="30.9" x2="90.7" y2="71.8" />
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    Dashboard: {
        image: <>
            <g>
                <g>
                    <path class="st-0" d="M67.3,90.8H51.5V80.3h29.8c8.9,0,12.1-6.3,12.1-12.1V26.3c0-8.9-6.3-12.1-12.1-12.1H18.8
               c-5.8,0-12.1,3.2-12.1,12.1v41.8c0,8.9,6.3,12.1,12.1,12.1h29.8v10.5H33.4"/>
                </g>
            </g>
            <path class="st-0" d="M22.9,43.8c5.4,0,9.8-4.4,9.8-9.8s-4.4-9.8-9.8-9.8s-9.8,4.4-9.8,9.8S17.5,43.8,22.9,43.8z" />
            <path class="st-0" d="M22.9,38.3c2.3,0,4.2-1.9,4.2-4.2s-1.9-4.2-4.2-4.2s-4.2,1.9-4.2,4.2S20.6,38.3,22.9,38.3z" />
            <path class="st-0" d="M58,46.1h-17c-2.3,0-4.2-1.9-4.2-4.2V28.7c0-2.3,1.9-4.2,4.2-4.2h17c2.3,0,4.2,1.9,4.2,4.2v13.1
       C62.3,44.2,60.4,46.1,58,46.1z"/>
            <path class="st-0" d="M82.7,46.1H69.4c-2.1,0-3.9-1.7-3.9-3.9V28.3c0-2.1,1.7-3.9,3.9-3.9h13.3c2.1,0,3.9,1.7,3.9,3.9v13.9
       C86.6,44.4,84.8,46.1,82.7,46.1z"/>
            <path class="st-0" d="M58,71.5h-17c-2.3,0-4.2-1.9-4.2-4.2V54.1c0-2.3,1.9-4.2,4.2-4.2h17c2.3,0,4.2,1.9,4.2,4.2v13.1
       C62.3,69.6,60.4,71.5,58,71.5z"/>
            <path class="st-0" d="M28.6,71.5H17c-2,0-3.7-1.6-3.7-3.7V53.5c0-2,1.6-3.7,3.7-3.7h11.6c2,0,3.7,1.6,3.7,3.7v14.3
       C32.3,69.9,30.7,71.5,28.6,71.5z"/>
            <path class="st-0" d="M82.7,71.5H69.4c-2.1,0-3.9-1.7-3.9-3.9V53.7c0-2.1,1.7-3.9,3.9-3.9h13.3c2.1,0,3.9,1.7,3.9,3.9v13.9
       C86.6,69.8,84.8,71.5,82.7,71.5z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    CommonRounded: {
        image: <>
            <path class="st-0" d="M64.8,90H35.2C21.3,90,10,78.7,10,64.8V35.2C10,21.3,21.3,10,35.2,10h29.5C78.7,10,90,21.3,90,35.2v29.5
       C90,78.7,78.7,90,64.8,90z"/>
            <path class="st-1" d="M64.6,83.6H35.4c-10.5,0-19-8.5-19-19V35.4c0-10.5,8.5-19,19-19h29.2c10.5,0,19,8.5,19,19v29.2
       C83.6,75.1,75.1,83.6,64.6,83.6z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    CommonLink: {
        image: <>
            <path class="st-0" d="M38.1,44.8V25.5c0-6.6,5.4-11.9,11.9-11.9h0c6.6,0,11.9,5.4,11.9,11.9v19.4c0,6.6-5.4,11.9-11.9,11.9h0" />
            <path class="st-0" d="M61.9,56.1v19.4c0,6.6-5.4,11.9-11.9,11.9h0c-6.6,0-11.9-5.4-11.9-11.9V56.1c0-6.6,5.4-11.9,11.9-11.9h0" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    CircleSolid: {
        image: <>
            <circle class="st-0" cx="50" cy="50" r="41.3" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    CircleSolidThick: {
        image: <>
            <circle class="st-0" cx="50" cy="50" r="41.3" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    CircleDotted2: {
        image: <>
            <circle class="st-0" cx="50" cy="50" r="41.3" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    CircleDashed2: {
        image: <>
            <circle class="st-0" cx="50" cy="50" r="41.3" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    CircleDashed1: {
        image: <>
            <circle class="st-0" cx="50" cy="50" r="41.3" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    BpmnDb: {
        image: <>
            <g>
                <path class="st-0" d="M94.8,63.8C94.8,63.8,94.8,63.8,94.8,63.8l0-26.3c0-2.2-1.8-4-4-4H9.2c-2.2,0-4,1.8-4,4v26.3
           c0,0.6,0.1,1.2,0.4,1.7C8.1,72.7,27,78.2,50,78.2C74.8,78.2,94.8,71.8,94.8,63.8C94.8,63.8,94.8,63.8,94.8,63.8z"/>
                <ellipse class="st-0" cx="50" cy="35.9" rx="44.8" ry="14.2" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN],
    },
    Youtube: {
        image: <>
            <g>
                <path class="st-0" d="M50,7.5C26.5,7.5,7.5,26.5,7.5,50s19,42.5,42.5,42.5c23.5,0,42.5-19,42.5-42.5S73.5,7.5,50,7.5z M72.6,58.4
           c0,4.3-3.5,7.8-7.8,7.8H35.3c-4.3,0-7.8-3.5-7.8-7.8V41.6c0-4.3,3.5-7.8,7.8-7.8h29.5c4.3,0,7.8,3.5,7.8,7.8V58.4z"/>
                <path class="st-1" d="M64.7,36.8H35.3c-2.6,0-4.8,2.1-4.8,4.8v16.9c0,2.6,2.1,4.8,4.8,4.8h29.5c2.6,0,4.8-2.1,4.8-4.8V41.6
           C69.5,38.9,67.4,36.8,64.7,36.8z"/>
                <polygon class="st-0" points="45.8,57.1 45.8,41.3 57.8,49.2 	" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    Yahoo: {
        image: <>
            <path class="st-0" d="M50.4,7.2c-23.5,0-42.5,19-42.5,42.5s19,42.5,42.5,42.5c23.5,0,42.5-19,42.5-42.5S73.9,7.2,50.4,7.2z
        M67.6,39.8l-4.3,1.4c-0.2,0.1-1.2,1-4.8,5.7c-3.6,4.5-4.6,6.4-4.8,7.2l-0.2,5.4l0.3,4.6l5.6,0.1l-1,3.9H41.1l0.5-3.6l3-0.2
       c1.6-0.2,1.9-0.5,1.9-0.6c0-0.1,0.2-0.7,0.2-4.4v-1.8l-0.1-3.5c-0.1-0.4-0.7-2.1-4.2-8.8c-3.3-6.2-4.7-8.5-5.3-9.3l-5.3-1.1v-3.7
       h18.3l-0.3,3.3l-5,0.8c1.7,3.8,4,8.6,6.8,14.3c3.5-4.3,5.6-7.2,6-8.7l-4.4-1l-0.3-3.7h16.1L67.6,39.8z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    Whatsapp: {
        image: <>
            <g>
                <path class="st-0" d="M50,7C26.3,7,7,26.3,7,50s19.3,43,43,43c23.7,0,43-19.3,43-43S73.7,7,50,7z M67.1,64.9
           c-4.4,4.4-10.2,6.8-16.3,6.8c-3.7,0-7.3-0.9-10.6-2.6L29.1,73c-0.2,0.1-0.5,0.1-0.7,0.1c-0.6,0-1.1-0.2-1.5-0.6
           c-0.6-0.6-0.8-1.4-0.5-2.2l3.9-11.1c-1.7-3.3-2.6-6.9-2.6-10.6c0-6.2,2.4-12,6.8-16.3c2.2-2.2,4.7-3.8,7.5-5
           c2.8-1.2,5.8-1.8,8.8-1.8c0,0,0,0,0,0c6.2,0,12,2.4,16.3,6.8c4.4,4.4,6.8,10.2,6.8,16.3S71.4,60.6,67.1,64.9z"/>
                <path class="st-0" d="M59.3,50.7c-1.1-1.1-2.8-1.1-3.9,0l-1.2,1.2c-2.9-1.6-5.2-3.9-6.8-6.8l1.2-1.2c1.1-1.1,1.1-2.8,0-3.9l-3.1-3.1
           c-1.1-1.1-2.8-1.1-3.9,0l-2.5,2.5c-1.4,1.4-1.5,3.9-0.2,6.9c1.1,2.6,3.2,5.5,5.8,8.2s5.5,4.7,8.2,5.8c1.4,0.6,2.8,0.9,3.9,0.9
           c1.3,0,2.3-0.4,3-1.1l2.5-2.5v0c0.5-0.5,0.8-1.2,0.8-1.9c0-0.7-0.3-1.4-0.8-1.9L59.3,50.7z"/>
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    ThinPolygon: {
        image: <>
            <polygon class="st-0" points="72.8,10.5 27.2,10.5 4.4,50 27.2,89.5 72.8,89.5 95.6,50 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    Talk: {
        image: <>
            <g>
                <circle class="st-0" cx="50" cy="50" r="42.8" />
                <path class="st-0" d="M40.7,8.2l-1.4,6.2c0,0,15.3,22.8,12.5,24.2c-2.8,1.4-9.1,5.4-9.1,5.4s4,6.8,2.8,7.3
           C44.4,52,31.7,55.9,32.3,57c0.6,1.1,8.2,3.7,9.3,4c1.1,0.3,3.1,0.6,2.8,2c-0.3,1.4-2.3,1.7-2,4.8c0.3,3.1,1.7,5.6,1.7,9
           c0,1.6,1,4.7-5.9,4.5c-12.7-0.3-23.4-7.6-23.4-7.6"/>
                <path class="st-0" d="M53.6,51.6c3.5,3.5,3.5,9.2,0,12.7" />
                <path class="st-0" d="M60.3,47.6c5.5,5.5,5.5,14.3,0,19.8" />
                <path class="st-0" d="M67,45.1c7.4,7.4,7.4,19.3,0,26.7" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    Skype: {
        image: <>
            <path class="st-0" d="M55,46.6C55,46.6,55,46.6,55,46.6c-4.9-0.9-7.7-2.2-7.7-2.2c-0.6-0.4-0.7-0.8-0.8-1.2c0-0.4,0.1-0.7,0.3-0.9
       c0.1-0.8,2.1-1.2,3.1-1.2c2.2,0,3.5,1.8,3.5,1.9c1.5,2.2,3,3.3,4.4,3.3c1,0,1.9-0.7,2-0.8c1-0.9,1.2-1.7,1.2-2.9c0-2.2-1.8-3.9-2-4
       c-2.2-2.1-5.2-3.1-8.7-3.1c-3.3,0-6,0.9-6.1,1c-5.8,1.9-6.2,6.9-5.7,9.3c0,0,0,0.1,0,0.1c2.1,5.9,11,6.6,11.4,6.7
       c4.1,0.3,4.3,2.2,4.3,2.3c0.1,2-1.8,2.6-4,2.7c-3.6-0.2-4.4-1.6-4.4-1.6l0,0c0-0.1-0.1-0.1-0.1-0.2c-2-2.6-2.7-3.5-4.4-3.5l-0.1,0
       c-1.4,0-2.2,0.6-2.6,1.1c-1.1,1.2-1,3-0.9,3.2c0,0,0,0.1,0,0.1c1.6,6.6,10,6.8,11,6.8c0,0,0,0,0,0c0.5,0,1,0,1.5,0
       c11.3,0,12.1-8.3,12.1-8.3C62.7,50.2,57.7,47.4,55,46.6z"/>
            <path class="st-0" d="M49.8,7.2c-23.5,0-42.5,19-42.5,42.5s19,42.5,42.5,42.5c23.5,0,42.5-19,42.5-42.5S73.3,7.2,49.8,7.2z
        M67.1,66.9c-2.2,2.4-5,3.6-8.2,3.6c-2.7,0-4.8-0.9-5.6-1.2c-0.7,0.1-1.3,0.1-2,0.1c-4.3,0-7.4-1.2-7.6-1.2
       C34,65.3,31.5,56.4,31.4,56.1c-1.9-5-1.3-9-1-10.3c-3.6-7.4,1.8-13.2,1.8-13.3c2.4-2.4,5.2-3.7,8.4-3.7c3,0,5.3,1.1,6.2,1.5
       c1.1-0.1,2.1-0.2,3.1-0.2c9.1,0,14.1,5.5,14.6,6.1c6.6,6.5,5.4,15.3,5.1,17.1C72.5,61.3,67.3,66.7,67.1,66.9z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    SadFace: {
        image: <>
            <g>
                <circle class="st-0" cx="50" cy="50" r="45.9" />
                <path class="st-1" d="M33.1,70.4c0,0,15.7-19.6,32.8-8.9" />
                <line class="st-1" x1="30.3" y1="42.6" x2="43.5" y2="37.2" />
                <line class="st-1" x1="58.4" y1="35.8" x2="72" y2="40.1" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    MobileHotspot: {
        image: <>
            <path class="st-0" d="M22,26.6V8.7c0-1.9,1.5-3.4,3.4-3.4h46.2c1.9,0,3.4,1.5,3.4,3.4v17.9" />
            <path class="st-0" d="M75,64.9v25.8c0,1.9-1.5,3.4-3.4,3.4H25.4c-1.9,0-3.4-1.5-3.4-3.4V64.9" />
            <path class="st-0" d="M17.1,45.5c17.8-17.8,46.6-17.8,64.4,0" />
            <path class="st-0" d="M27.7,56.1c11.9-11.9,31.3-11.9,43.2,0" />
            <path class="st-0" d="M37.2,65.6c6.7-6.7,17.5-6.7,24.1,0" />
            <path class="st-0" d="M45.6,74c2-2,5.3-2,7.4,0" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    Mobile: {
        image: <>
            <g>
                <path class="st-0" d="M68.6,91.3H30.7c-1.9,0-3.5-1.6-3.5-3.5V12.6c0-1.9,1.6-3.5,3.5-3.5h37.9c1.9,0,3.5,1.6,3.5,3.5v75.1
           C72.1,89.7,70.6,91.3,68.6,91.3z"/>
                <ellipse class="st-0" cx="49.7" cy="84" rx="3.5" ry="2.5" />
                <line class="st-0" x1="27.6" y1="75.7" x2="72.2" y2="75.7" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    MediBox: {
        image: <>
            <g>
                <circle class="st-0" cx="269.1" cy="882.5" r="41.2" />
                <g>
                    <path class="st-0" d="M276.9,898.1v-31.8 M291,898.1v-23.4c0-0.4-0.3-0.7-0.8-0.7h-13.3v-10.4c0-0.4-0.3-0.7-0.8-0.7h-23.7
               c-0.5,0-0.8,0.2-0.8,0.7v34.4"/>
                    <line class="st-0" x1="257.2" y1="871" x2="272" y2="871" />
                    <line class="st-0" x1="257.2" y1="877.5" x2="272" y2="877.5" />
                    <line class="st-0" x1="257.2" y1="884.1" x2="272" y2="884.1" />
                    <line class="st-0" x1="257.2" y1="891.2" x2="272" y2="891.2" />
                    <line class="st-0" x1="257.2" y1="896.9" x2="272" y2="896.9" />
                </g>
            </g>
            <path class="st-0" d="M83.7,79.4H14.9c-3.1,0-5.7-2.6-5.7-5.7V30.6c0-3.1,2.6-5.7,5.7-5.7h68.8c3.1,0,5.7,2.6,5.7,5.7v43.2
       C89.4,76.8,86.9,79.4,83.7,79.4z"/>
            <path class="st-1" d="M32.6,28c0-6.2,4.1-11.2,9.1-11.2h15.1c5,0,9.1,5.1,9.1,11.2" />
            <line class="st-1" x1="49.3" y1="40.6" x2="49.3" y2="63.7" />
            <line class="st-1" x1="60.9" y1="52.1" x2="37.8" y2="52.1" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    MailFavorite: {
        image: <>
            <path class="st-0" d="M82.2,87.7H16.4c-3.5,0-6.3-2.8-6.3-6.3V38.2c0-3.5,2.8-6.3,6.3-6.3h65.8c3.5,0,6.3,2.8,6.3,6.3v43.1
       C88.5,84.8,85.7,87.7,82.2,87.7z"/>
            <path class="st-1" d="M87.6,35.2L54.1,64.4c-1.3,1.2-3.1,1.7-4.8,1.7s-3.5-0.6-4.8-1.7L10.9,35.2" />
            <polygon class="st-0" points="54.7,6 61.5,19.7 76.6,21.9 65.7,32.5 68.2,47.6 54.7,40.5 41.2,47.6 43.8,32.5 32.9,21.9 48,19.7 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    MailCircle: {
        image: <>
            <path class="st-0" d="M51.2,7.8c-23.5,0-42.5,19-42.5,42.5c0,23.5,19,42.5,42.5,42.5c23.5,0,42.5-19,42.5-42.5
       C93.7,26.9,74.6,7.8,51.2,7.8z M36.7,38.1h29c0.5,0,0.9,0.1,1.3,0.3L52.4,51.1c-0.6,0.5-1.8,0.5-2.4,0L35.4,38.4
       C35.8,38.2,36.2,38.1,36.7,38.1z M68.4,59.8c0,1.5-1.2,2.8-2.8,2.8h-29c-1.5,0-2.8-1.2-2.8-2.8V41.4l13.9,12.1
       c0.9,0.8,2.1,1.2,3.3,1.2c1.2,0,2.4-0.4,3.3-1.2l13.9-12.1V59.8z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    MailBox: {
        image: <>
            <polygon class="st-0" points="36,16.5 5.5,31.1 15.1,36.1 3.5,46.9 16.1,53.1 16.4,78.3 49.8,95.4 86,77.6 85.8,49.6 94.9,44.5 
       82.2,34.8 94.8,24.8 60.3,7.8 57.8,10.6 51.3,8.8 48.3,12.1 41.8,10 "/>
            <g>
                <path class="st-1" d="M22.3,40.5l17.4-29.1c1-1.7,3.3-2.3,5.1-1.3L66.4,23c1.7,1,2.3,3.3,1.3,5.1L54.2,50.6" />
                <path class="st-1" d="M43,9.6l4.6,25.5c0.2,1,0,2.1-0.6,2.9c-0.5,0.9-1.3,1.6-2.3,1.9l-12.7,4.1" />
            </g>
            <g>
                <path class="st-1" d="M48,12.2l0.9-1.6c1-1.7,3.3-2.3,5.1-1.3l21.6,12.9c1.7,1,2.3,3.3,1.3,5.1l-9.5,16.2" />
                <path class="st-1" d="M52.1,8.9l1.2,5.9" />
            </g>
            <polyline class="st-1" points="16.1,53.1 16.1,78.7 49.7,95.8 86,77.6 86,49.9 " />
            <polyline class="st-1" points="29.2,29.3 15.1,36.1 5.3,30.6 37.4,15.1 " />
            <polyline class="st-1" points="49.7,95.8 49.7,54 38.7,64.4 3.5,46.9 15,36.4 49.8,53.1 82.7,35.9 74.5,31 " />
            <polyline class="st-2" points="94.9,44.5 60.9,63.4 49.2,53.5 " />
            <polyline class="st-2" points="95.9,44.7 82.2,34.8 94.8,24.8 60.3,7.8 57.2,11.1 60.3,7.8 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    Mail: {
        image: <>

            <path class="st-0" d="M86.6,79.7H13.2c-4.1,0-7.4-3.3-7.4-7.4V30.4c0-4.1,3.3-7.4,7.4-7.4h73.4c4.1,0,7.4,3.3,7.4,7.4v41.9
       C94,76.4,90.7,79.7,86.6,79.7z"/>
            <path class="st-1" d="M5.8,28.6l38.8,34.2c2.6,2.2,7.1,2.2,9.7,0l39.2-34.2" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    LinkedIn: {
        image: <>
            <path class="st-0" d="M50,7.5C26.5,7.5,7.5,26.5,7.5,50s19,42.5,42.5,42.5c23.5,0,42.5-19,42.5-42.5S73.5,7.5,50,7.5z M44.1,59.9
       c0,0.3-0.2,0.5-0.5,0.5h-5.8c-0.3,0-0.5-0.2-0.5-0.5V41.3c0-0.3,0.2-0.5,0.5-0.5h5.8c0.3,0,0.5,0.2,0.5,0.5V59.9z M40.8,39.3
       c-2.1,0-3.8-1.7-3.8-3.8c0-2.1,1.7-3.8,3.8-3.8c2.1,0,3.8,1.7,3.8,3.8C44.6,37.6,42.9,39.3,40.8,39.3z M67.3,59.9
       c0,0.3-0.2,0.5-0.5,0.5h-5.8c-0.3,0-0.5-0.2-0.5-0.5v-9c0-2.5-0.2-4.5-2.5-4.5c-2.2,0-3,1.2-3,4.3v9.2c0,0.3-0.2,0.5-0.5,0.5h-5.8
       c-0.3,0-0.5-0.2-0.5-0.5V41.3c0-0.3,0.2-0.5,0.5-0.5h5.5c0.3,0,0.5,0.2,0.5,0.5v1.2c1-1.1,2.8-2.1,5.1-2.1c6.5,0,7.4,4.7,7.4,9.3
       V59.9z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    Instagram: {
        image: <>
            <g>
                <path class="st-0" d="M50,7.5C26.5,7.5,7.5,26.5,7.5,50s19,42.5,42.5,42.5c23.5,0,42.5-19,42.5-42.5S73.5,7.5,50,7.5z M69.4,58.9
           c0,5.8-4.7,10.5-10.5,10.5H41.1c-5.8,0-10.5-4.7-10.5-10.5V41.1c0-5.8,4.7-10.5,10.5-10.5h17.8c5.8,0,10.5,4.7,10.5,10.5V58.9z"/>
                <g>
                    <circle class="st-0" cx="50" cy="50" r="8.3" />
                </g>
                <g>
                    <path class="st-0" d="M60.9,35.6c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1C64,37,62.6,35.6,60.9,35.6z" />
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    HappyFace: {
        image: <>
            <circle class="st-0" cx="50.2" cy="49.9" r="46.5" />
            <path class="st-1" d="M66.3,58.3c0,0-15.9,19.9-33.2,9" />
            <line class="st-1" x1="26.4" y1="41" x2="40.8" y2="41" />
            <line class="st-1" x1="55.2" y1="39" x2="69.1" y2="35.5" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    Google: {
        image: <>
            <path class="st-0" d="M49.9,9.7C28,9.7,10.3,27.5,10.3,49.3c0,21.9,17.7,39.6,39.6,39.6c21.9,0,39.6-17.7,39.6-39.6
       C89.5,27.5,71.8,9.7,49.9,9.7z M54.9,33.3l-2.4,1.7c-0.1,0.1-0.3,0.2-0.5,0.2h-0.9c1.1,1.3,1.8,3.2,1.8,5.4c0,2.4-1.2,4.6-3.4,6.3
       c-1.7,1.3-1.7,1.7-1.7,2.4c0,0.4,1.2,1.7,2.5,2.7c3,2.1,4.5,4.3,4.5,7.7c0,3.6-3.1,6.7-7.4,8C46,68,44.6,68.2,43,68.2
       c-1.7,0-3.4-0.2-4.9-0.6c-3-0.8-5.2-2.2-6.2-4c-0.4-0.8-0.7-1.6-0.7-2.5c0-0.9,0.2-1.8,0.6-2.7c1.6-3.5,6-5.9,10.8-5.9
       c0,0,0.1,0,0.1,0c-0.4-0.7-0.6-1.4-0.6-2.1c0-0.4,0-0.8,0.1-1.1c-5-0.1-8.8-3.8-8.8-8.7c0-3.4,2.4-6.8,6.3-8.2
       c1.2-0.4,2.7-0.5,3.9-0.5h10.8c0.4,0,0.7,0.2,0.8,0.6C55.4,32.7,55.2,33.1,54.9,33.3z"/>
            <line class="st-0" x1="64.1" y1="39.4" x2="64.1" y2="56.5" />
            <line class="st-0" x1="72.7" y1="47.9" x2="55.6" y2="47.9" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    Github: {
        image: <>

            <g>
                <path class="st-0" d="M92.5,51.2C92.5,27,73.5,7.5,50,7.5S7.5,27,7.5,51.2c0,19.1,12,35.4,28.7,41.3c1-0.8,2.2-1.7,2.2-3.3
           c0-2.4-0.1-8.6-0.1-8.6s-1.8,0.3-4.5,0.3c-6.6,0-8.7-4.3-9.7-6.7c-1.3-3.2-3-4.6-4.8-5.8c-1.1-0.7-1.4-1.6-0.1-1.8
           c5.9-1.1,7.4,6.8,11.3,8.1c2.8,0.9,6.4,0.5,8.2-0.7c0.2-2.4,1.9-4.5,3.4-5.6c-10-1-15.9-4.5-19-10.2l-0.3-0.6L22,55.7L21.8,55
           c-1-2.9-1.4-6.2-1.4-9.9c0-6.6,2-9,4.7-12.5C23.1,25.1,25.9,20,25.9,20s4.3-0.9,12.5,5.1c4.4-1.9,16.2-2.1,21.8-0.4
           c3.4-2.3,9.7-5.6,12.2-4.7c0.7,1.1,2.2,4.4,0.9,11.6c0.9,1.6,5.3,4.9,5.3,14.5c-0.1,3.5-0.4,6.5-1.1,9l-0.4,1.3
           c0,0-0.2,0.6-0.4,1.2l-0.3,0.6c-3,6.6-9,9.1-18.8,10.1c3.2,2,4.1,4.6,4.1,11.5s-0.1,7.9-0.1,9.5c0,1.4,1.1,2.4,2.1,3.2
           C80.4,86.6,92.5,70.3,92.5,51.2z"/>
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    FbCircle: {
        image: <>
            <path class="st-0" d="M50,7.5C26.5,7.5,7.5,26.5,7.5,50s19,42.5,42.5,42.5s42.5-19,42.5-42.5S73.5,7.5,50,7.5z M61.7,31.9
       c-0.9,1.3-2.6,1.7-3.9,1c-0.2,0-0.8-0.2-2.1-0.2c-1.6,0-2.5,1.1-2.7,1.5c-0.6,0.9-1,2.6-1,4.9v6.2h4c1.7,0,3.1,1.4,3.1,3.1
       s-1.4,3.1-3.1,3.1h-4v15.8c0,1.7-1.4,3.1-3.1,3.1S46,68.9,46,67.2V51.4h-4c-1.7,0-3.1-1.4-3.1-3.1s1.4-3.1,3.1-3.1h4v-6.2
       c0-3.7,0.6-6.3,2-8.3c0.6-0.9,3.1-4.2,7.8-4.2c3,0,4.5,0.6,5.2,1C62.3,28.6,62.7,30.5,61.7,31.9z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    EmailCharts: {
        image: <>
            <path class="st-0" d="M37.4,29.8c0,0-8.8,0-10.7,0S22,30,21.3,31.7c-0.7,1.7-1.2,3.6-1.2,3.6s-4.7,0-5.9,1.4s-2.4,4.7-2.4,4.7h24.9
       l41.5,20.7v25.2c0,0,3.6,0.7,5.7-1.2c2.1-1.9,1.9-6.6,1.9-6.6s1.4,0.7,4.3-1.2s2.1-4.7,2.1-4.7V42.8L37.4,29.8z"/>
            <path class="st-1" d="M78.9,61.8v25.9c0,3.3-2.7,5.9-5.9,5.9H11.1c-3.3,0-5.9-2.7-5.9-5.9V47.1c0-3.3,2.7-5.9,5.9-5.9h25.4" />
            <path class="st-2" d="M59.7,61.9C58.6,62.5,44.9,73.2,42,73.3c-1.5,0.1-3.3-0.5-4.5-1.6L5.9,44.2" />
            <g>
                <path class="st-2" d="M85.7,58.5v23.1c0,3.3-2.7,5.9-5.9,5.9 M12,41c0-3.3,2.7-5.9,5.9-5.9h18.6" />
                <path class="st-2" d="M84.9,38.2" />
            </g>
            <g>
                <path class="st-2" d="M92.1,49.4v25c0,3.2-2.6,5.7-5.8,5.7 M19.9,35c0-3.2,3-5.3,6.2-5.3h10.5" />
            </g>
            <path class="st-1" d="M44.2,16.1c0-5.3-9-9-3.8-9h45c5.3,0,9.6,4.3,9.6,9.6v25.9c0,4.4-2.2,7.3-6.2,8.4" />
            <path class="st-1" d="M78.8,61.5H46.5c-5.3,0-9.6-4.3-9.6-9.6V26c0-5.3-8.4-9.6-3.2-9.6h45c5.3,0,9.6,4.3,9.6,9.6v25.9
       C88.4,57.2,84,61.5,78.8,61.5z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    Email: {
        image: <>
            <g>
                <path class="st-0" d="M88.8,84.5H11.2c-4.1,0-7.4-3.3-7.4-7.4V26.3c0-4.1,3.3-7.4,7.4-7.4h77.5c4.1,0,7.4,3.3,7.4,7.4v50.8
           C96.2,81.2,92.9,84.5,88.8,84.5z"/>
                <path class="st-0" d="M95.1,22.7L55.6,57.1c-1.6,1.4-3.6,2-5.7,2c-2.1,0-4.1-0.7-5.7-2L4.8,22.7" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    Call: {
        image: <>
            <path class="st-0" d="M50,7.5C26.5,7.5,7.5,26.5,7.5,50s19,42.5,42.5,42.5c23.5,0,42.5-19,42.5-42.5S73.5,7.5,50,7.5z M65.7,61.9
       L65.7,61.9l-3.3,3.3c-1,1-2.4,1.5-4,1.5c-1.5,0-3.3-0.4-5.2-1.2c-3.5-1.5-7.4-4.3-10.9-7.7c-3.5-3.5-6.2-7.3-7.7-10.9
       c-1.7-4-1.6-7.3,0.3-9.2l3.3-3.3c1.4-1.4,3.7-1.4,5.1,0l4.2,4.2c1.4,1.4,1.4,3.7,0,5.1l-1.5,1.5c2.1,3.8,5.2,6.9,9,9l1.5-1.5
       c1.4-1.4,3.7-1.4,5.1,0l4.2,4.2c0.7,0.7,1.1,1.6,1.1,2.6C66.7,60.3,66.3,61.2,65.7,61.9z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.SOCIAL],
    },
    Star: {
        image: <>
            <polygon class="st-0" points="50.2,8.1 63.7,35.5 94,39.9 72.1,61.2 77.2,91.3 50.2,77.1 23.2,91.3 28.3,61.2 6.5,39.9 36.7,35.5 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.STARS],
    },
    Star2: {
        image: <>
            <polygon class="st-0" points="49.8,5.6 56.6,28.8 75.8,14 67.7,36.9 91.9,36.2 71.9,49.9 91.9,63.5 67.7,62.9 75.8,85.7 56.6,70.9 
       49.8,94.1 42.9,70.9 23.7,85.7 31.8,62.9 7.7,63.5 27.6,49.9 7.7,36.2 31.8,36.9 23.7,14 42.9,28.8 "/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.STARS],
    },
    Star3: {
        image: <>
            <polygon class="st-0" points="49.9,7.4 65,35 92.6,50 65,65.1 49.9,92.7 34.9,65.1 7.3,50 34.9,35 " />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.STARS],
    },
    Star4: {
        image: <>
            <path class="st-0" d="M52.1,8.8l0.5,4c0.3,2.2,3.2,2.5,4,0.5L58,9.5c0.9-2.3,4.3-1.4,4,1l-0.5,3.9c-0.3,2.2,2.5,3.2,3.8,1.5l2.3-3.3
       c1.4-2,4.5-0.3,3.7,1.9l-1.4,3.6c-0.8,2,1.7,3.8,3.3,2.3l3-2.6c1.9-1.6,4.5,0.8,3.1,2.8l-2.2,3.1c-1.3,1.8,0.7,4.1,2.7,3.1l3.4-1.8
       c2.2-1.1,4.2,1.8,2.3,3.4l-2.8,2.4c-1.7,1.4-0.3,4.1,1.9,3.6l3.6-0.9c2.4-0.6,3.6,2.8,1.4,3.9l-3.2,1.6c-1.9,1-1.2,3.9,1,3.9l3.6,0
       c2.5,0,2.9,3.5,0.5,4.1L88,48c-2.1,0.5-2.1,3.5,0,4.1l3.5,0.8c2.4,0.6,2,4.1-0.5,4.1l-3.6,0c-2.2,0-2.9,2.9-1,3.9l3.2,1.6
       c2.2,1.1,1,4.5-1.4,3.9l-3.6-0.9c-2.1-0.5-3.5,2.2-1.9,3.6l2.8,2.4c1.9,1.6-0.1,4.6-2.3,3.4l-3.4-1.8c-1.9-1-3.9,1.3-2.7,3.1
       l2.2,3.1c1.4,2-1.2,4.4-3.1,2.8l-3-2.6c-1.6-1.4-4.1,0.3-3.3,2.3l1.4,3.6c0.9,2.3-2.2,4-3.7,1.9l-2.3-3.3c-1.2-1.8-4-0.7-3.8,1.5
       l0.5,3.9c0.3,2.4-3.1,3.3-4,1l-1.4-3.8c-0.8-2-3.8-1.7-4,0.5l-0.5,4c-0.3,2.4-3.8,2.4-4.1,0l-0.5-4c-0.3-2.2-3.2-2.5-4-0.5L42,90.5
       c-0.9,2.3-4.3,1.4-4-1l0.5-3.9c0.3-2.2-2.5-3.2-3.8-1.5l-2.3,3.3c-1.4,2-4.5,0.3-3.7-1.9l1.4-3.6c0.8-2-1.7-3.8-3.3-2.3l-3,2.6
       c-1.9,1.6-4.5-0.8-3.1-2.8l2.2-3.1c1.3-1.8-0.7-4.1-2.7-3.1L16.9,75c-2.2,1.1-4.2-1.8-2.3-3.4l2.8-2.4c1.7-1.4,0.3-4.1-1.9-3.6
       l-3.6,0.9c-2.4,0.6-3.6-2.8-1.4-3.9l3.2-1.6c1.9-1,1.2-3.9-1-3.9L9,57c-2.5,0-2.9-3.5-0.5-4.1L12,52c2.1-0.5,2.1-3.5,0-4.1l-3.5-0.8
       C6.1,46.6,6.5,43,9,43l3.6,0c2.2,0,2.9-2.9,1-3.9l-3.2-1.6c-2.2-1.1-1-4.5,1.4-3.9l3.6,0.9c2.1,0.5,3.5-2.2,1.9-3.6l-2.8-2.4
       c-1.9-1.6,0.1-4.6,2.3-3.4l3.4,1.8c1.9,1,3.9-1.3,2.7-3.1l-2.2-3.1c-1.4-2,1.2-4.4,3.1-2.8l3,2.6c1.6,1.4,4.1-0.3,3.3-2.3l-1.4-3.6
       c-0.9-2.3,2.2-4,3.7-1.9l2.3,3.3c1.2,1.8,4,0.7,3.8-1.5L38,10.5c-0.3-2.4,3.1-3.3,4-1l1.4,3.8c0.8,2,3.8,1.7,4-0.5l0.5-4
       C48.2,6.4,51.8,6.4,52.1,8.8z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.STARS],
    },
    Star5: {
        image: <>
            <path class="st-0" d="M51.6,8.5l0.9,7.6c0.2,1.7,2.6,2,3.2,0.4l2.8-7.2c0.7-1.8,3.4-1.1,3.2,0.8l-0.9,7.6c-0.2,1.7,2,2.6,3,1.2
       l4.4-6.3c1.1-1.6,3.6-0.3,2.9,1.5l-2.7,7.1c-0.6,1.6,1.3,3,2.6,1.8l5.8-5c1.5-1.3,3.6,0.6,2.4,2.2l-4.3,6.1c-1,1.4,0.6,3.2,2.1,2.4
       l6.8-3.5c1.7-0.9,3.3,1.4,1.8,2.7l-5.6,4.9c-1.3,1.1-0.2,3.3,1.5,2.8l7.3-1.8c1.9-0.5,2.9,2.2,1.1,3.1l-6.6,3.4
       c-1.5,0.8-1,3.1,0.8,3.1l7.5,0c2,0,2.3,2.8,0.4,3.3l-7.2,1.7c-1.7,0.4-1.7,2.8,0,3.2l7.2,1.7c1.9,0.5,1.6,3.3-0.4,3.3l-7.5,0
       c-1.7,0-2.3,2.3-0.8,3.1l6.6,3.4c1.7,0.9,0.8,3.5-1.1,3.1l-7.3-1.8c-1.7-0.4-2.8,1.7-1.5,2.8l5.6,4.9c1.5,1.3-0.1,3.6-1.8,2.7
       l-6.8-3.5c-1.5-0.8-3.1,1-2.1,2.4l4.3,6.1c1.1,1.6-1,3.5-2.4,2.2l-5.8-5c-1.3-1.1-3.2,0.2-2.6,1.8l2.7,7.1c0.7,1.8-1.8,3.1-2.9,1.5
       l-4.4-6.3c-1-1.4-3.2-0.6-3,1.2l0.9,7.6c0.2,1.9-2.5,2.6-3.2,0.8l-2.8-7.2c-0.6-1.6-3-1.3-3.2,0.4l-0.9,7.6c-0.2,1.9-3,1.9-3.3,0
       l-0.9-7.6c-0.2-1.7-2.6-2-3.2-0.4l-2.8,7.2c-0.7,1.8-3.4,1.1-3.2-0.8l0.9-7.6c0.2-1.7-2-2.6-3-1.2l-4.4,6.3
       c-1.1,1.6-3.6,0.3-2.9-1.5l2.7-7.1c0.6-1.6-1.3-3-2.6-1.8l-5.8,5c-1.5,1.3-3.6-0.6-2.4-2.2l4.3-6.1c1-1.4-0.6-3.2-2.1-2.4l-6.8,3.5
       c-1.7,0.9-3.3-1.4-1.8-2.7l5.6-4.9c1.3-1.1,0.2-3.3-1.5-2.8l-7.3,1.8c-1.9,0.5-2.9-2.2-1.1-3.1l6.6-3.4c1.5-0.8,1-3.1-0.8-3.1
       l-7.5,0c-2,0-2.3-2.8-0.4-3.3l7.2-1.7c1.7-0.4,1.7-2.8,0-3.2l-7.2-1.7c-1.9-0.5-1.6-3.3,0.4-3.3l7.5,0c1.7,0,2.3-2.3,0.8-3.1
       l-6.6-3.4c-1.7-0.9-0.8-3.5,1.1-3.1l7.3,1.8c1.7,0.4,2.8-1.7,1.5-2.8l-5.6-4.9c-1.5-1.3,0.1-3.6,1.8-2.7l6.8,3.5
       c1.5,0.8,3.1-1,2.1-2.4l-4.3-6.1c-1.1-1.6,1-3.5,2.4-2.2l5.8,5c1.3,1.1,3.2-0.2,2.6-1.8L29,14.1c-0.7-1.8,1.8-3.1,2.9-1.5l4.4,6.3
       c1,1.4,3.2,0.6,3-1.2l-0.9-7.6c-0.2-1.9,2.5-2.6,3.2-0.8l2.8,7.2c0.6,1.6,3,1.3,3.2-0.4l0.9-7.6C48.6,6.6,51.4,6.6,51.6,8.5z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.STARS],
    },
    Star6: {
        image: <>
            <path class="st-0" d="M43.2,7.1c1.3,7.6,12.3,7.6,13.6,0l0,0l0,0c-1.1,7.6,9.3,11,12.9,4.2l0,0l0,0c-3.4,6.9,5.4,13.4,11,8l0,0l0,0
       c-5.4,5.6,1,14.4,8,11l0,0l0,0c-6.8,3.6-3.4,14,4.2,12.9l0,0l0,0c-7.6,1.3-7.6,12.3,0,13.6l0,0l0,0c-7.6-1.1-11,9.3-4.2,12.9l0,0
       l0,0c-6.9-3.4-13.4,5.4-8,11l0,0l0,0c-5.6-5.4-14.4,1-11,8l0,0l0,0c-3.6-6.8-14-3.4-12.9,4.2l0,0l0,0c-1.3-7.6-12.3-7.6-13.6,0l0,0
       l0,0c1.1-7.6-9.3-11-12.9-4.2l0,0l0,0c3.4-6.9-5.4-13.4-11-8l0,0l0,0c5.4-5.6-1-14.4-8-11l0,0l0,0c6.8-3.6,3.4-14-4.2-12.9l0,0l0,0
       c7.6-1.3,7.6-12.3,0-13.6l0,0l0,0c7.6,1.1,11-9.3,4.2-12.9l0,0l0,0c6.9,3.4,13.4-5.4,8-11l0,0l0,0c5.6,5.4,14.4-1,11-8l0,0l0,0
       C33.9,18.1,44.3,14.7,43.2,7.1L43.2,7.1L43.2,7.1z"/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.STARS],
    },
    ScanBed: {
        image: <>
            <g>
                <circle class="st-0" cx="269.1" cy="882.5" r="41.2" />
                <g>
                    <path class="st-0" d="M276.9,898.1v-31.8 M291,898.1v-23.4c0-0.4-0.3-0.7-0.8-0.7h-13.3v-10.4c0-0.4-0.3-0.7-0.8-0.7h-23.7
               c-0.5,0-0.8,0.2-0.8,0.7v34.4"/>
                    <line class="st-0" x1="257.2" y1="871" x2="272" y2="871" />
                    <line class="st-0" x1="257.2" y1="877.5" x2="272" y2="877.5" />
                    <line class="st-0" x1="257.2" y1="884.1" x2="272" y2="884.1" />
                    <line class="st-0" x1="257.2" y1="891.2" x2="272" y2="891.2" />
                    <line class="st-0" x1="257.2" y1="896.9" x2="272" y2="896.9" />
                </g>
            </g>
            <g>
                <path class="st-0" d="M41.9,9.5V9c0-2.3,1.9-4.2,4.2-4.2h7c2.3,0,4.2,1.9,4.2,4.2v0.5" />
                <path class="st-0" d="M65.3,38H34.7c-3.1,0-5.7-2.6-5.7-5.7V15.1c0-3.1,2.6-5.7,5.7-5.7h30.6c3.1,0,5.7,2.6,5.7,5.7v17.2
           C71,35.4,68.5,38,65.3,38z"/>
                <path class="st-0" d="M27,65.6c0,6.9,0,13.8,0,20.6c0,4.9,1.3,6.2,6.2,6.2c12,0,24.1,0,36.1,0c4.9,0,6.2-1.3,6.2-6.2
           c0-6.9,0-13.8,0-20.6"/>
                <path class="st-0" d="M30.1,58.9c19.4,0,38.9,0,58.3,0c1.2,0,2.5-0.3,3.6,0.1c1.5,0.4,3.2,0.9,3.1,3c0,2.6-1.7,2.6-3.6,2.6
           c-10.8,0-21.7,0-32.5,0c-15.7,0-31.3,0-47,0c-2,0-4.7,0.7-4.6-2.6c0.1-3.1,2.6-3.2,5.1-3.1c4.1,0.1,8.3,0,12.4,0"/>
                <path class="st-0" d="M38.4,65.6c-0.3,3,0.3,4.9,4.1,4.7c5.8-0.3,11.7-0.3,17.5,0c3.8,0.2,4.4-1.7,4.1-4.7" />
                <path class="st-1" d="M88.8,64.7c0.4,8.9-0.7,10.7-9.6,10.7c-0.9,0-1.7,0-2.6,0" />
                <path class="st-1" d="M15.7,65.6c0,9.8,0,9.8,10.8,9.8" />
                <path class="st-0" d="M10.2,28.5c1.4,0,2.8,0,4.1,0c2.9-0.1,4.1,1,3.7,4.1c-0.4,3.2,0,5.7,0,9c-0.4,2.6-4.9,1.6-7.3,1.8" />
                <path class="st-0" d="M10,18.1c0,13.4,0,26.8,0,40.3" />
                <line class="st-0" x1="50" y1="38.2" x2="50" y2="58.6" />
                <line class="st-0" x1="56.7" y1="38.2" x2="56.7" y2="58.6" />
                <line class="st-0" x1="42.6" y1="38.2" x2="42.6" y2="58.6" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.STARS],
    },
    Flash: {
        image: <>
            <polygon class="st-0" points="26.9,25.7 28.3,39.3 16.3,36 19.9,43.2 5.4,43.7 20.8,52.4 11.3,60.2 24.3,61.3 16.2,73.4 35.8,66.8 
       35.2,75.8 43.9,69.9 49.7,78 54.7,69 60.3,83.1 63.4,68.6 73.5,76.9 72.2,66.3 91.7,69.1 76.7,58.2 90.6,56.3 79.5,51.1 95,44.3 
       78.9,42.4 87.5,29.9 73.1,35.4 72.2,26.2 63,33.1 63,20.9 51.6,31.6 41.9,18.7 41.1,32.1 "/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.STARS],
    },
    Flash2: {
        image: <>
            <polygon class="st-0" points="26.9,25.7 28.3,39.3 16.3,36 19.9,43.2 5.4,43.7 20.8,52.4 11.3,60.2 24.3,61.3 16.2,73.4 35.8,66.8 
       35.2,75.8 43.9,69.9 49.7,78 54.7,69 60.3,83.1 63.4,68.6 73.5,76.9 72.2,66.3 91.7,69.1 76.7,58.2 90.6,56.3 79.5,51.1 95,44.3 
       78.9,42.4 87.5,29.9 73.1,35.4 72.2,26.2 63,33.1 63,20.9 51.6,31.6 41.9,18.7 41.1,32.1 "/>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.STARS],
    },
    Banner: {
        image: <>
            <path class="st-0" d="M5.9,65.3c0,0,16.2,4.5,21.2,0s3.9-33.3-1.4-28S9.2,39.6,9.2,39.6l5,11.2L5.9,65.3z" />
            <path class="st-0" d="M95.5,65.3c0,0-16.2,4.5-21.2,0s-3.9-33.3,1.4-28c5.4,5.4,16.4,2.2,16.4,2.2l-5,11.2L95.5,65.3z" />
            <path class="st-0" d="M77.5,62.3c0,0-12.4-3.1-26.9-3.1s-26.8,3.1-26.8,3.1V35.2c0,0,11.4-5.9,26.8-5.9s26.9,5.9,26.9,5.9V62.3z" />
            <line class="st-0" x1="23.8" y1="62.3" x2="27" y2="65.3" />
            <line class="st-0" x1="77.5" y1="62.3" x2="74" y2="65.3" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BANNERS],
    },
    Banner2: {
        image: <>
            <circle class="st-0" cx="17.9" cy="77.5" r="6.6" />
            <path class="st-1" d="M22,21.7c0,0,0,48.2,0,53.9c0,5.7-3.9,8.4-3.9,8.4s50,0,56,0c6,0,5.9-9.5,5.9-9.5V25.8" />
            <path class="st-0" d="M22,20.4L22,20.4c0-3.6,3-6.6,6.6-6.6l52.4,0c3.6,0,6.6,3,6.6,6.6v0c0,3.6-3,6.6-6.6,6.6H28.6
       C25,27,22,24,22,20.4z"/>
            <circle class="st-2" cx="28.6" cy="20.6" r="6.6" />
            <path class="st-2" d="M28.4,23.7c-1.8,0-3.2-1.5-3.2-3.2s1.5-3.2,3.2-3.2c1.8,0,3.2,1.5,3.2,3.2" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BANNERS],
    },
    Banner3: {
        image: <>
            <g>
                <polyline class="st-0" points="11.4,65.9 29.7,65.9 29.7,43.7 14.3,43.7 	" />
                <path class="st-0" d="M10.5,65.9L10.5,65.9c-2.6,0-4.6-2.1-4.6-4.6V43c0-2.6,2.1-4.6,4.6-4.6h0c2.6,0,4.6,2.1,4.6,4.6v18.3
           C15.2,63.8,13.1,65.9,10.5,65.9z"/>
                <circle class="st-1" cx="10.6" cy="61.3" r="4.6" />
                <path class="st-1" d="M12.9,61.4c0,1.3-1,2.3-2.3,2.3s-2.3-1-2.3-2.3s1-2.3,2.3-2.3" />
            </g>
            <g>
                <polyline class="st-0" points="88.5,65.9 70.2,65.9 70.2,43.7 85.6,43.7 	" />
                <path class="st-0" d="M89.4,65.9L89.4,65.9c2.6,0,4.6-2.1,4.6-4.6V43c0-2.6-2.1-4.6-4.6-4.6h0c-2.6,0-4.6,2.1-4.6,4.6v18.3
           C84.7,63.8,86.8,65.9,89.4,65.9z"/>
                <circle class="st-1" cx="89.3" cy="61.3" r="4.6" />
                <path class="st-1" d="M87,61.4c0,1.3,1,2.3,2.3,2.3c1.3,0,2.3-1,2.3-2.3s-1-2.3-2.3-2.3" />
            </g>
            <rect x="26.9" y="37" class="st-0" width="46.3" height="26.2" />
            <line class="st-0" x1="26.7" y1="63.5" x2="29.5" y2="66.1" />
            <line class="st-0" x1="73.4" y1="63.5" x2="70.4" y2="66.1" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BANNERS],
    },
    Banner4: {
        image: <>
            <circle class="st-0" cx="20" cy="18" r="6.7" />
            <path class="st-1" d="M76.6,21.9c0,0-48.9,0-54.7,0s-8.6-4-8.6-4s0,50.8,0,56.8s9.6,6,9.6,6h49.5" />
            <path class="st-0" d="M78,21.9L78,21.9c3.7,0,6.7,3,6.7,6.7v53.2c0,3.7-3,6.7-6.7,6.7h0c-3.7,0-6.7-3-6.7-6.7V28.6
       C71.3,24.9,74.3,21.9,78,21.9z"/>
            <circle class="st-2" cx="77.8" cy="28.6" r="6.7" />
            <path class="st-2" d="M74.6,28.4c0-1.8,1.5-3.3,3.3-3.3s3.3,1.5,3.3,3.3s-1.5,3.3-3.3,3.3" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BANNERS],
    },
    Banner5: {
        image: <>
            <polygon class="st-0" points="7.9,64.9 28,64.9 28,40.4 11,40.4 14,51.1 " />
            <polygon class="st-0" points="92.9,64.9 72.8,64.9 72.8,40.4 89.7,40.4 86.7,51.1 " />
            <rect x="24.9" y="33.1" class="st0" width="51.1" height="28.9" />
            <line class="st-0" x1="24.7" y1="62.2" x2="27.8" y2="65.1" />
            <line class="st-0" x1="76.2" y1="62.1" x2="72.8" y2="65" />
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BANNERS],
    },
    Columns: {
        image: <>
            <rect x="12.2" y="12.1" class="st0" width="25.1" height="75.3" />
            <rect x="37.4" y="12.1" class="st0" width="25.1" height="75.3" />
            <rect x="62.5" y="12.1" class="st0" width="25.1" height="75.3" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BANNERS],
    },
    PaintBucket: {
        image: <>
            <g>
                <path class="st-0" d="M78.3,53.7l-4.2-4.7l-8.2-9.3L44.3,15L12.8,42.7c-4.6,4.1-5.1,11.2-1,15.9l15,17c4.1,4.6,11.2,5.1,15.9,1
           l26.8-23.6L78.3,53.7z"/>
                <path d="M9.3,52.9c0,0,1.2,3.4,2.5,4.8l15,17.1c4.1,4.7,11.3,5.2,15.9,1.1l26.8-23.6L9.3,52.9z" />
                <path d="M91,74.5C91,80.3,86.4,85,80.6,85s-10.5-4.7-10.5-10.5c0-5.8,10.5-16.3,10.5-16.3S91,68.8,91,74.5z" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.COMMON],
    },
    Pin: {
        image: <>
            <path class="st-0" d="M71.3,14.6C65.6,8.9,58.1,5.8,50,5.8c-8.1,0-15.6,3.1-21.3,8.8C18.1,25.1,16.8,45,25.8,57L50,91.9l24.1-34.9
       C83.2,45,81.9,25.1,71.3,14.6z"/>
            <path class="st-1" d="M50,24.6c-6.1,0-11,4.9-11,11s4.9,11,11,11s11-4.9,11-11S56.1,24.6,50,24.6z" />
        </>
        ,
        viewBox: "0 0 100 100",
        hideTextInput: true,
        category: [Categories.MISC],
    },
    Pin2: {
        image: <>
            <path class="st0" d="M39.3,56.6c-4.3-4.3-8.5-8.5-12.7-12.6c-0.3-0.3-0.7-0.7-1-1c-1.5-1.5-1.5-2.7,0.1-4.2
       c3.5-3.1,8.8-3.5,12.7-0.8c0.3,0.2,0.6,0.5,1.1,0.8c1.5-1.3,3-2.5,4.5-3.8c6.4-5.5,12.8-11,19.2-16.4c0.7-0.6,1-1.1,0.6-2.1
       c-1.1-3-0.4-5.7,1.8-8c1-1,2.3-1,3.4,0.1c2.9,2.8,5.7,5.7,8.6,8.6c4.7,4.7,9.5,9.5,14.2,14.2c1.7,1.7,1.7,2.9-0.2,4.4
       c-2.3,1.8-4.9,2.1-7.6,1.1c-0.5-0.2-0.9-0.3-1.3,0.2C75.6,45.1,68.8,53,62,60.9c-0.1,0.1-0.1,0.2-0.2,0.4c1.8,2.2,2.7,4.7,2.5,7.5
       c-0.2,2.6-1.2,4.8-3.1,6.6c-1.1,1-2.3,0.9-3.5-0.2c-4-4-7.9-7.9-11.9-11.9c-0.4-0.4-0.7-0.8-1.1-1.4c-2.3,2.3-4.3,4.4-6.4,6.5
       c-8,8.2-16.3,16-25.3,23c-0.7,0.5-1.7,0.9-2.5,0.8c-1.4-0.1-2.1-1.7-1.4-2.9c0.2-0.5,0.6-0.9,0.9-1.3c7.4-9.5,15.7-18.2,24.3-26.6
       C36,59.9,37.5,58.3,39.3,56.6z"/>
        </>,
        viewBox: "0 0 100 100",
        hideTextInput: true,
        category: [Categories.MISC],
    },
    Pin3: {
        image: <>
            <g>
                <path class="st0" d="M31,59.3c0,0-14.1,32.7-15.2,35c-1.1,2.3,0.7,3.4,2.4,1.5c1.7-1.9,26-28.5,26-28.5L31,59.3z" />
                <path class="st0" d="M53.6,40.2c-12.4-8.5-28.6-6.4-36.7,4.4c-0.3,0.3-0.5,0.7-0.7,1c-3.5,6,4.5,17.1,17.8,24.7
           c13.3,7.6,26.9,8.8,30.3,2.8c0.3-0.5,0.5-1,0.6-1.6l0.1,0C68.9,60.7,64.5,47.7,53.6,40.2z"/>
                <path class="st0" d="M45.8,18.1l-13.1,21c0,0-0.5,0.7-0.5,2.5c0,1.8,1.3,7.2,9.6,12.3s15.9,3.3,17.2,2.9s1.8-1.7,1.8-1.7l15.1-21.9
           L45.8,18.1z"/>
                <path class="st0" d="M43.3,9c-3.1,9.2,0.9,20.1,10.1,26.1c10.6,6.9,24.3,4.9,30.9-4.6L43.3,9z" />
                <ellipse transform="matrix(0.4773 -0.8787 0.8787 0.4773 16.7534 66.3148)" class="st0" cx="64.1" cy="19.1" rx="10.6" ry="23.2" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        hideTextInput: true,
        category: [Categories.MISC],
    },
    Grid: {
        image: <>
            <path class="st-0" d="M12,39h22.2v22.2H12V39z M60.5,34.8H38.3V12.7h22.2V34.8z M38.3,39h22.2v22.2H38.3V39z M64.6,39h22.2v22.2H64.6
       V39z M86.8,12.7v22.2H64.6V12.7H86.8z M12,12.7h22.2v22.2H12V12.7z M12,65.3h22.2v22.2H12V65.3z M38.3,65.3h22.2v22.2H38.3V65.3z
        M86.8,87.5H64.6V65.3h22.2V87.5z"/>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.GRIDS],
    },
    Grid2: {
        image: <>
            <g>
                <line class="st0" x1="24.8" y1="29.5" x2="75" y2="28.7" />
                <rect x="24.7" y="9.5" class="st0" width="50.7" height="81" />
                <line class="st0" x1="50" y1="29.8" x2="50" y2="90.5" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.GRIDS],
    },
    Grid3: {
        image: <>
            <g>
                <line class="st0" x1="29.5" y1="75.2" x2="28.7" y2="25" />

                <rect x="24.7" y="9.5" transform="matrix(6.123234e-17 -1 1 6.123234e-17 4.547474e-13 100)" class="st0" width="50.7" height="81" />
                <line class="st0" x1="29.8" y1="50" x2="90.5" y2="50" />
            </g>
        </>
        ,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.GRIDS],
    },
    GridBasic: {
        image: <>
            <g>
                <line class="st-0" x1="8.3" y1="36.1" x2="92.4" y2="36.1" />
                <rect x="7.6" y="66" class="st1" width="84.8" height="10.5" />
                <rect x="8.1" y="23.6" class="st0" width="84.2" height="52.8" />
            </g>
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.GRIDS],
    },
    Rows: {
        image: <>
            <rect x="37.2" y="-12" transform="matrix(-1.836970e-16 1 -1 -1.836970e-16 74.4295 -24.4247)" class="st-0" width="24.5" height="73.9" />
            <rect x="37.2" y="12.6" transform="matrix(-1.836970e-16 1 -1 -1.836970e-16 98.9621 0.108)" class="st-0" width="24.5" height="73.9" />
            <rect x="37.2" y="37.1" transform="matrix(-1.836970e-16 1 -1 -1.836970e-16 123.4948 24.6407)" class="st-0" width="24.5" height="73.9" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.GRIDS],
    },
    Stripe: {
        image: <>
            <rect x="10.7" y="46" class="st0" width="78.5" height="7.9" />
        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.GRIDS],
    },
    HorizontalLine: {
        image: <rect x="0.5" width="134" height="2" rx="2" strokeWidth="0" fill='black' vectorEffect="non-scaling-stroke" />,
        viewBox: "0 0 135 2",
        keepAspectRatio: false,
        size: { width: 50, height: 2 },
        hideTextInput: true,
        hideShape: true,
        category: [Categories.COMMON],
    },
    VerticalLine: {
        image: <rect y="0.5" width="2" height="134" rx="2" strokeWidth="0" fill='black' vectorEffect="non-scaling-stroke" />,
        viewBox: "0 0 2 135",
        keepAspectRatio: false,
        size: { width: 2, height: 50 },
        hideTextInput: true,
        hideShape: true,
        category: [Categories.COMMON]
    },
    Text: {
        image: <text transform="matrix(1 0 0 1 11.6778 62.5603)" class="st0 st1">Text</text>,
        viewBox: "0 0 100 100",
        size: { width: 50, height: 20 },
        keepAspectRatio: false,
        hideShape: true,
        category: [Categories.COMMON]
    },
    Table: {
        image: <>
            <g>
                <path d="M245.9,5.2v89.7H4.7V5.2H245.9 M246.9,4.2H3.7v91.7h243.1V4.2L246.9,4.2z" />
            </g>
            <g>
                <line class="st0" x1="59.5" y1="4.8" x2="59.5" y2="95" />
            </g>
            <g>
                <line class="st0" x1="158" y1="4.8" x2="158" y2="95" />
            </g>
            <line class="st0" x1="4.6" y1="21.2" x2="246.4" y2="21.2" />
        </>,
        viewBox: "0 0 251 101",
        size: { width: 100, height: 100 },
        keepAspectRatio: false,
        hideTextInput: true,
        hideShape: true,
        category: [Categories.DATA_VISUALIZATION]
    },
    LineChart: {
        image: <>
            <polyline class="st0" points="10.2,14.7 88.4,14.7 88.4,87.1 " />
            <path class="st1" d="M87.9,52.8C67,52.8,50,35.9,50,15" />
            <g>
                <g>
                    <path class="st2" d="M87.7,80.7c-0.2,0-0.3,0-0.5,0" />
                    <path class="st3" d="M85.2,80.7c-34.6-1.3-62.3-29.4-63.1-64" />
                    <path class="st2" d="M22.1,15.6c0-0.2,0-0.3,0-0.5" />
                </g>
            </g>
            <line class="st4" x1="88.4" y1="14.7" x2="17.8" y2="57.5" />
            <line class="st4" x1="88" y1="15.2" x2="42.1" y2="83.8" />
        </>
        ,
        viewBox: "0 0 100 100",
        size: { width: 100, height: 100 },
        category: [Categories.DATA_VISUALIZATION]
    },
    MatrixChart: {
        image: <>
            <path class="st0" d="M806,632.7H13.8c-3,0-5.5-2.5-5.5-5.5V13.7c0-3,2.5-5.5,5.5-5.5H806c3,0,5.5,2.5,5.5,5.5v613.4
            C811.5,630.2,809,632.7,806,632.7z"/>
            <g>
                <rect x="36.5" y="37.5" class="st1" width="747.8" height="57" />
                <g>
                    <text transform="matrix(1 0 0 1 375.0496 74.7012)" class="st2 st3 st4">HEADER</text>
                </g>
            </g>
            <rect x="36.5" y="98.4" class="st1" width="747.8" height="132.1" />
            <rect x="36.5" y="234.2" class="st1" width="747.8" height="181.6" />
            <g>
                <path class="st5" d="M172.7,217.3H66c-6.6,0-12-5.4-12-12v-77.3c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v77.3
                C184.7,211.9,179.3,217.3,172.7,217.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 95.7513 171.6804)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st7" d="M318.6,217.3H211.9c-6.6,0-12-5.4-12-12v-77.3c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v77.3
                C330.6,211.9,325.2,217.3,318.6,217.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 241.6713 171.6804)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st8" d="M464.5,217.3H357.8c-6.6,0-12-5.4-12-12v-77.3c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v77.3
                C476.5,211.9,471.1,217.3,464.5,217.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 387.5914 171.6804)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st9" d="M610.5,217.3H503.7c-6.6,0-12-5.4-12-12v-77.3c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v77.3
                C622.5,211.9,617.1,217.3,610.5,217.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 533.5114 171.6804)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st10" d="M756.4,217.3H649.7c-6.6,0-12-5.4-12-12v-77.3c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v77.3
                C768.4,211.9,763,217.3,756.4,217.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 679.4315 171.6804)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st5" d="M172.7,291.2H66c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C184.7,285.8,179.3,291.2,172.7,291.2z"/>
                <g>
                    <text transform="matrix(1 0 0 1 95.7513 277.0671)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st7" d="M318.6,291.2H211.9c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C330.6,285.8,325.2,291.2,318.6,291.2z"/>
                <g>
                    <text transform="matrix(1 0 0 1 241.6713 277.0671)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st7" d="M318.6,343.9H211.9c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C330.6,338.5,325.2,343.9,318.6,343.9z"/>
                <g>
                    <text transform="matrix(1 0 0 1 241.6713 329.7604)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st8" d="M464.5,291.2H357.8c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C476.5,285.8,471.1,291.2,464.5,291.2z"/>
                <g>
                    <text transform="matrix(1 0 0 1 387.5914 277.0671)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st9" d="M610.5,291.2H503.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C622.5,285.8,617.1,291.2,610.5,291.2z"/>
                <g>
                    <text transform="matrix(1 0 0 1 533.5114 277.0671)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st9" d="M610.5,343.9H503.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C622.5,338.5,617.1,343.9,610.5,343.9z"/>
                <g>
                    <text transform="matrix(1 0 0 1 533.5114 329.7604)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st10" d="M756.4,291.2H649.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C768.4,285.8,763,291.2,756.4,291.2z"/>
                <g>
                    <text transform="matrix(1 0 0 1 679.4314 277.0671)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st10" d="M756.4,343.9H649.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C768.4,338.5,763,343.9,756.4,343.9z"/>
                <g>
                    <text transform="matrix(1 0 0 1 679.4314 329.7604)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st5" d="M172.7,343.9H66c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C184.7,338.5,179.3,343.9,172.7,343.9z"/>
                <g>
                    <text transform="matrix(1 0 0 1 95.7513 329.7604)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st5" d="M172.7,396.5H66c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C184.7,391.1,179.3,396.5,172.7,396.5z"/>
                <g>
                    <text transform="matrix(1 0 0 1 95.7513 382.4538)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <rect x="36.5" y="419.6" class="st1" width="747.8" height="181.6" />
            <g>
                <path class="st5" d="M172.7,476.6H66c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C184.7,471.2,179.3,476.6,172.7,476.6z"/>
                <g>
                    <text transform="matrix(1 0 0 1 95.7513 462.4938)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st7" d="M318.6,476.6H211.9c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C330.6,471.2,325.2,476.6,318.6,476.6z"/>
                <g>
                    <text transform="matrix(1 0 0 1 241.6713 462.4938)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st7" d="M318.6,529.3H211.9c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C330.6,523.9,325.2,529.3,318.6,529.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 241.6713 515.1871)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st8" d="M464.5,476.6H357.8c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C476.5,471.2,471.1,476.6,464.5,476.6z"/>
                <g>
                    <text transform="matrix(1 0 0 1 387.5914 462.4938)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st9" d="M610.5,476.6H503.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C622.5,471.2,617.1,476.6,610.5,476.6z"/>
                <g>
                    <text transform="matrix(1 0 0 1 533.5114 462.4938)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st10" d="M756.4,476.6H649.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C768.4,471.2,763,476.6,756.4,476.6z"/>
                <g>
                    <text transform="matrix(1 0 0 1 679.4314 462.4938)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st10" d="M756.4,529.3H649.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C768.4,523.9,763,529.3,756.4,529.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 679.4314 515.1871)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st10" d="M756.4,582H649.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12V570
                C768.4,576.6,763,582,756.4,582z"/>
                <g>
                    <text transform="matrix(1 0 0 1 679.4314 567.8805)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st5" d="M172.7,529.3H66c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C184.7,523.9,179.3,529.3,172.7,529.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 95.7513 515.1871)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st5" d="M172.7,582H66c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12V570
                C184.7,576.6,179.3,582,172.7,582z"/>
                <g>
                    <text transform="matrix(1 0 0 1 95.7513 567.8804)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
        </>
        ,
        viewBox: "0 0 819.7 640.1",
        size: { width: 300, height: 300 },
        keepAspectRatio: false,
        category: [Categories.DATA_VISUALIZATION]
    },
    PieChart: {
        image: <>
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path fill="#231F20" d="m216.3,45.4c-106,15.4-184.4,105.4-184.4,213.8-7.10543e-15,119.2 97,216.2 216.2,216.2 52,0 101.7-18.6 141-52.5l-163.5-163.5c-6-6-9.3-14-9.3-22.5v-191.5l0-0zm31.7,450.8c-130.7,0-237-106.3-237-237 0-123 92.3-224.5 214.7-235.9 2.9-0.3 5.8,0.7 8,2.7 2.2,2 3.4,4.8 3.4,7.7v203.3c0,2.9 1.1,5.7 3.2,7.7l171.2,171.2c2,2 3.1,4.7 3.1,7.5 0,2.8-1.2,5.5-3.2,7.4-44.4,42.2-102.4,65.4-163.4,65.4z"></path> <g fill="#231F20"> <path d="m286.3,15.8c-3-0.3-10.4,0.9-11.4,10.4v194.4c0,2.8 1.1,5.4 3.1,7.4l162.8,162.8c7.4,6.4 14.1,1.2 15.8-1.3 29-40.5 44.4-88.2 44.4-137.8-5.68434e-14-123-92.3-224.4-214.7-235.9zm160.3,351.4l-150.9-150.9v-178.3c105.9,15.5 184.4,105.4 184.4,213.8 0,41.1-11.5,80.7-33.5,115.4z"></path> <path d="m240.3,244.7c-2.1-2.1-3.2-4.8-3.2-7.7v-203.4c-0.8-9.3-8.5-10.7-11.4-10.4-122.4,11.5-214.7,112.9-214.7,236 0,130.7 106.3,237 237,237 60.9,0 118.9-23.3 163.3-65.5 2-1.9 6-8.1 0.2-14.9l-171.2-171.1zm7.7,230.7c-119.2,0-216.2-97-216.2-216.2 0-108.4 78.5-198.3 184.4-213.8v191.5c0,8.5 3.3,16.5 9.3,22.5l163.5,163.4c-39.3,34-89,52.6-141,52.6z"></path> </g> </g> </g>
        </>,
        viewBox: "0 0 512 512",
        hideTextInput: true,
        category: [Categories.DATA_VISUALIZATION]
    },
    BarChart: {
        image: <>
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g fill="#231F20"> <path d="M21.4,432.5h76.1c5.8,0,10.4-4.7,10.4-10.4V116c0-5.8-4.7-10.4-10.4-10.4H21.4c-5.8,0-10.4,4.7-10.4,10.4 v306.1C11,427.9,15.7,432.5,21.4,432.5z M31.9,126.4h55.2v285.2H31.9V126.4z"></path> <path d="m152.5,432.5h76.1c5.8,0 10.4-4.7 10.4-10.4v-212.8c0-5.8-4.7-10.4-10.4-10.4h-76.1c-5.8,0-10.4,4.7-10.4,10.4v212.8c-0.1,5.8 4.6,10.4 10.4,10.4zm10.4-212.7h55.2v191.9h-55.2v-191.9z"></path> <path d="m283.5,432.5h76.1c5.8,0 10.4-4.7 10.4-10.4v-375.8c0-5.8-4.7-10.4-10.4-10.4h-76.1c-5.8,0-10.4,4.7-10.4,10.4v375.8c0,5.8 4.6,10.4 10.4,10.4zm10.4-375.8h55.2v355h-55.2v-355z"></path> <path d="m490.6,152.7h-76.1c-5.8,0-10.4,4.7-10.4,10.4v259c0,5.8 4.7,10.4 10.4,10.4h76.1c5.8,0 10.4-4.7 10.4-10.4v-259c0-5.7-4.7-10.4-10.4-10.4zm-10.5,259h-55.2v-238.1h55.2v238.1z"></path> <path d="m490.6,455.3h-469.2c-5.8,0-10.4,4.7-10.4,10.4s4.7,10.4 10.4,10.4h469.1c5.8,0 10.4-4.7 10.4-10.4s-4.6-10.4-10.3-10.4z"></path> </g> </g> </g>
        </>,
        viewBox: "0 0 512 512",
        hideTextInput: true,
        category: [Categories.DATA_VISUALIZATION],
        size: { width: 440, height: 280 },
    },
    MatrixTable: {
        image: <><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M48,3.5C48,2.7,47.3,2,46.5,2h-31C14.7,2,14,2.7,14,3.5v5c0,0.8,0.7,1.5,1.5,1.5h31c0.8,0,1.5-0.7,1.5-1.5 V3.5z"></path> </g> </g> <g> <g> <path d="M10,15.5c0-0.8-0.7-1.5-1.5-1.5h-3C4.7,14,4,14.7,4,15.5v13C4,29.3,4.7,30,5.5,30h3c0.8,0,1.5-0.7,1.5-1.5 V15.5z"></path> </g> </g> <g> <g> <path d="M10,35.5c0-0.8-0.7-1.5-1.5-1.5h-3C4.7,34,4,34.7,4,35.5v13C4,49.3,4.7,50,5.5,50h3c0.8,0,1.5-0.7,1.5-1.5 V35.5z"></path> </g> </g> <g> <g> <path d="M29,15.5c0-0.8-0.7-1.5-1.5-1.5h-12c-0.8,0-1.5,0.7-1.5,1.5v3c0,0.8,0.7,1.5,1.5,1.5h12 c0.8,0,1.5-0.7,1.5-1.5V15.5z"></path> </g> </g> <g> <g> <path d="M48,15.5c0-0.8-0.7-1.5-1.5-1.5h-12c-0.8,0-1.5,0.7-1.5,1.5v3c0,0.8,0.7,1.5,1.5,1.5h12 c0.8,0,1.5-0.7,1.5-1.5V15.5z"></path> </g> </g> <g> <g> <path d="M29,25.5c0-0.8-0.7-1.5-1.5-1.5h-12c-0.8,0-1.5,0.7-1.5,1.5v3c0,0.8,0.7,1.5,1.5,1.5h12 c0.8,0,1.5-0.7,1.5-1.5V25.5z"></path> </g> </g> <g> <g> <path d="M48,25.5c0-0.8-0.7-1.5-1.5-1.5h-12c-0.8,0-1.5,0.7-1.5,1.5v3c0,0.8,0.7,1.5,1.5,1.5h12 c0.8,0,1.5-0.7,1.5-1.5V25.5z"></path> </g> </g> <g> <g> <path d="M29,35.5c0-0.8-0.7-1.5-1.5-1.5h-12c-0.8,0-1.5,0.7-1.5,1.5v3c0,0.8,0.7,1.5,1.5,1.5h12 c0.8,0,1.5-0.7,1.5-1.5V35.5z"></path> </g> </g> <g> <g> <path d="M48,35.5c0-0.8-0.7-1.5-1.5-1.5h-12c-0.8,0-1.5,0.7-1.5,1.5v3c0,0.8,0.7,1.5,1.5,1.5h12 c0.8,0,1.5-0.7,1.5-1.5V35.5z"></path> </g> </g> <g> <g> <path d="M29,45.5c0-0.8-0.7-1.5-1.5-1.5h-12c-0.8,0-1.5,0.7-1.5,1.5v3c0,0.8,0.7,1.5,1.5,1.5h12 c0.8,0,1.5-0.7,1.5-1.5V45.5z"></path> </g> </g> <g> <g> <path d="M48,45.5c0-0.8-0.7-1.5-1.5-1.5h-12c-0.8,0-1.5,0.7-1.5,1.5v3c0,0.8,0.7,1.5,1.5,1.5h12 c0.8,0,1.5-0.7,1.5-1.5V45.5z"></path> </g> </g> </g></>,
        viewBox: "0 0 52 52",
        hideTextInput: true,
        keepAspectRatio: false,
        category: [Categories.DATA_VISUALIZATION],
        size: { width: 400, height: 400 },
    },
}