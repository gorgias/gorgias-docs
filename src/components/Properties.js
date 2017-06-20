import React from 'react'
import {Link} from 'react-router'

const Property = ({prop, name, required}) => {
    const displayName = prop.get('type') || prop.get('$ref').split('/')[2]
    let displayComp = displayName

    if (!prop.get('type') && prop.get('$ref')) {
        let url = prop.get('$ref').split('/')
        url.shift()
        url = `/${url.join('/')}`

        displayComp = <Link to={url}><b>{displayName}</b></Link>
    } else if (prop.get('type') && prop.get('format')) {
        displayComp = `${prop.get('format')} (${prop.get('type')})`
    }

    return (
        <tr>
            <td>{name} {required && required.includes(name) ? <span className="required">req.</span> : ''}</td>
            <td>{displayComp}</td>
            <td>{prop.get('description')}</td>
        </tr>
    )
}

export const Properties = ({name, definition}) => {
    if (!definition) {
        return null
    }
    const requiredProps = definition.get('required') || []
    const properties = definition
        .get('properties')
        .sortBy((p, name) => name)
        .sortBy((p, name) => !requiredProps.includes(name))
        .sortBy((p, name) => name.indexOf('_datetime') !== -1)
        .sortBy((p, name) => name !== 'id')

    return (
        <div className="attributes">
            <h2>{name} object properties:</h2>
            <div className="tableCard">
                {/*  Table for the Attributes of the object  */}
                <table className="ui celled striped table" id="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        properties.map((prop, name) => (
                            <Property key={name} prop={prop} name={name} required={requiredProps}/>
                        )).toList()
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
