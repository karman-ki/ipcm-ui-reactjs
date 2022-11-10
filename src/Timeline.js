
import React from 'react';

const Timeline = ({ step }) => {

    const stepMap = {
        "inclusion": 1,
        "pathology": 2,
        "biobank": 3,
        "sequencing": 4,
        "data delivered": 5,
        "analysis": 6,
        "curation": 7,
        "report": 8,
        null: 0
    };

    const colors = ['', '#f5a551', '#e8c64d', '#d6d63c', '#c4e046', '#a8de45', '#96e046', '#71db44', '#3bd13b']

    const ActiveNode = (step) => {
        return (
            <div className="node active" style={{ backgroundColor: colors[step] }}></div>
        )
    }
    const ActivePath = (step) => {
        return (
            <div className="path active" style={{ background: `linear-gradient(90deg, ${colors[step]} 0%, ${colors[step + 1]} 100%)` }}></div>
        )
    }
    const SemiActivePath = (step) => {
        return (
            <div className="path semi-active" style={{ background: `linear-gradient(90deg, ${colors[step]} 50%, rgb(196, 196, 196) 50%)` }}></div>
        )
    }

    const stepNum = stepMap[step];
    let steps = []
    const len = Object.keys(stepMap).length
    for (let i = 1; i < len; i++) {

        if (i < stepNum) {
            steps.push(ActiveNode(i));
            steps.push(ActivePath(i))
        } else if (i === stepNum) {
            if (i < len - 1) {
                steps.push(ActiveNode(i))
                steps.push(SemiActivePath(i))
            } else {
                steps.push(ActiveNode(i))
            }
        } else {
            if (i < len - 1) {
                steps.push(<div className="node"></div>)
                steps.push(<div className="path"></div>)
            } else {
                steps.push(<div className="node"></div>)

            }
        }
    }

    return (
        <>
            <div className="process">
                <div className="process-steps">
                    {steps}
                </div>
            </div>
        </>
    );
};

export default Timeline;