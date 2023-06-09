import React from "react";
import arrowDrop from "../../../assets/images/drop-level-arrow.png"
import lineDrop from "../../../assets/images/drop-level-line.png"

const UserSelectedFields = ({ data = [], dataFeieldName = 'description', language = 'en', closable = false, onClose, } = {}) => {
    const getBgColor = (index) => {
        switch (index) {
            case 0:
                return 'bg-blue-light';
            case 1:
                return 'bg-blue-lighter';
            case 2:
                return 'bg-blue-lighter2';
            case 3:
                return 'bg-blue-lighter3';
            case 4:
                return 'bg-grey-lighter4';
            default:
                break;
        }
    }

    return (
        <div className="p-t-10 n-float">
            {
                data?.map((main) => {
                    return (
                        main[dataFeieldName]?.map((inner, index) => {
                            if (inner.lang === language) {
                                if (inner.parent) {
                                    let lastIndex;
                                    return (
                                        <div key={index} className="m-b-20">
                                            {
                                                inner.parent.map((parents, index) => {
                                                    const resultStyle = "result-item " + getBgColor(index);
                                                    lastIndex = index
                                                    return (
                                                        <div style={{ marginLeft: 20 * index }} className={resultStyle} key={index}>
                                                            <div className="body-text">
                                                                <img src={index === 0 ? lineDrop : arrowDrop} className='fl m-r-20 m-t-5' style={{ width: index === 0 ? 6 : 10 }} alt='' />
                                                                <div className="body-text-bold m-r-10 fl">{parents.code}</div>
                                                                {parents.value}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div style={{ marginLeft: 20 * (lastIndex + 1) }} className={"result-item " + getBgColor(lastIndex + 1)} >
                                                <div className="body-text">
                                                    <img src={arrowDrop} className='fl m-r-20 m-t-5' style={{ width: 10 }} alt='' />
                                                    <div className="body-text-bold m-r-10 fl">{main.code}</div>
                                                    {inner.value}
                                                </div>
                                                {closable ?
                                                    <i className='icon-close-1 close-icon' onClick={() => onClose(main.code)} /> : null
                                                }
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div className="result-item bg-blue-light m-b-20" key={index} >
                                            <div className="body-text">
                                                <img src={index === 0 ? lineDrop : arrowDrop} className='fl m-r-20 m-t-5' style={{ width: index === 0 ? 6 : 10 }} alt='' />
                                                <div className="body-text-bold m-r-10 fl">{main.code}</div>
                                                {inner.value}
                                            </div>
                                            {closable ?
                                                <i className='icon-close-1 close-icon' onClick={() => onClose(main.code)} /> : null
                                            }
                                        </div>
                                    )
                                }
                            }
                        })
                    )
                })
            }
        </div>

    )
}

export default UserSelectedFields;