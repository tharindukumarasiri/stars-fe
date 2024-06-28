import React from 'react'

const formDataSample = [
    {
        "id": "field_1719495011969",
        "value": "Q1",
        "type": "text",
        "required": true,
        "children": []
    },
    {
        "id": "field_1719495028695",
        "value": "Q2",
        "type": "textarea",
        "required": false,
        "children": []
    },
    {
        "id": "field_1719495040111",
        "value": "Q3",
        "type": "number",
        "required": false,
        "children": []
    },
    {
        "id": "field_1719495047660",
        "value": "Q4",
        "type": "radio",
        "required": false,
        "options": [
            {
                "id": "field_1719495393067",
                "value": "RQ1"
            },
            {
                "id": "field_1719495411294",
                "value": "RQ2"
            }
        ],
        "children": []
    },
    {
        "id": "field_1719495455315",
        "value": "Q5",
        "type": "checkBox",
        "required": false,
        "options": [
            {
                "id": "field_1719495471818",
                "value": "CQ1"
            },
            {
                "id": "field_1719495476482",
                "value": "CQ2"
            }
        ],
        "children": []
    },
    {
        "id": "field_1719495495381",
        "value": "Q6",
        "type": "dropDown",
        "required": false,
        "listData": "Oslo, Bergen, Tor"
    },
    {
        "id": "field_1719495534897",
        "value": "Q7",
        "type": "date",
        "required": false
    },
    {
        "id": "field_1719495550338",
        "value": "Q8",
        "type": "time",
        "required": false
    }
]

function FormFill(data) {
    return (
        <div>formFill</div>
    )
}

export default FormFill