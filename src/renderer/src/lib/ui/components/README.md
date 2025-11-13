# FOLDER DISTRIBUTION

This folder contains all the **STYLED** **components** than can be used anywhere but mostly on forms.  
This components doesn't have data or behavior. You must provide this ones to use them.

## CHARACTERISTIC

| CHARACTERISTIC        |  VALUE   |
| :-------------------- | :------: |
| Reusable or Singleton | Reusable |
| Styled or Headless    |  Styled  |
| Customizable styles   |    ❌    |
| Customizable behavior |    ✅    |
| Customizable contents |    ✅    |
| Extensible            |    ✅    |

A good example is a Select. It contains the styles and logic but you need to pass the data and expected behavior when a value is selected.  
This components by themselve do nothing onther than be visually there.

If your component has data, like a Select with values, this is probably not the correct folder on most cases.  
If the component changes a config move it to the `settings` folder and if it has data from a feature/module move it to the corresponding folder.
