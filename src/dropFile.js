import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from 'semantic-ui-react'

const DropFile = ({printData}) => {

  const [filename,setFile] = useState('no file')
  //const [data,setData] = useState([])

  const onDrop = useCallback( async files => {
    try {
      let file = await files[0].text()
      let DATA = await file.split('\n')
      setFile(files[0].name)
      printData( DATA.splice(0, DATA.length-1) )
    } catch {
      // failure
    }
  }, [])

  const onReset = (e) => {
    setFile('')
    //setData([])
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept:'.csv,.txt'})

  return (
    <div>
      <div {...getRootProps({ className:'dropbox' })} >
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drop a file here, or click to select</p>
        }
      </div>
      {filename && <p>Data from: {filename}</p>}
      <Button color='blue' onClick={onReset} content='RESET' />
    </div>
  )
}

export default DropFile
