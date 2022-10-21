

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

    const stepNum = stepMap[step];
    let steps = []
    const len = Object.keys(stepMap).length
    for (let i = 1; i < len; i++) {

        if (i < stepNum) {
            steps.push(<div className="node active"></div>)
            steps.push(<div className="path active"></div>)
        } else if (i == stepNum) {
            if (i < len - 1) {
                steps.push(<div className="node active"></div>)
                steps.push(<div className="path semi-active"></div>)
            } else {
                steps.push(<div className="node active"></div>)
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