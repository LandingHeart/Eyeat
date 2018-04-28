/**
 * Multiple ways to import:
 * 1- Importing a specific font as Icon
 * -- import Icon from './lib/Icons/FontAwesome'
 *
 * 2- Importing a specific font as its name
 * -- import {FontAwesome} from './lib/Icons'
 *
 * 3- Importing all fonts in an Icon object
 * -- import * as Icon from './lib/Icons'
 *
 * 4 - Using the default import, use same as 3
 * -- import Icon from './lib/Icons'
 */

import MaterialCommunityIconsI from './MaterialCommunityIcons'
import SimpleLineIconsI from './SimpleLineIcons'
import MaterialIconsI from './MaterialIcons'
import FontAwesomeI from './FontAwesome'
import FoundationI from './Foundation'
import EvilIconsI from './EvilIcons'
import IoniconsI from './Ionicons'
import OcticonsI from './Octicons'
import FeatherI from './Feather'
import EntypoI from './Entypo'
import ZocialI from './Zocial'
import React from 'react'

export const MaterialCommunityIcons = props => (
    <MaterialCommunityIconsI {...props} />
)
export const SimpleLineIcons = props => <SimpleLineIconsI {...props} />
export const MaterialIcons = props => <MaterialIconsI {...props} />
export const FontAwesome = props => <FontAwesomeI {...props} />
export const Foundation = props => <FoundationI {...props} />
export const EvilIcons = props => <EvilIconsI {...props} />
export const Ionicons = props => <IoniconsI {...props} />
export const Octicons = props => <OcticonsI {...props} />
export const Feather = props => <FeatherI {...props} />
export const Entypo = props => <EntypoI {...props} />
export const Zocial = props => <ZocialI {...props} />

export default {
    MaterialCommunityIcons,
    SimpleLineIcons,
    MaterialIcons,
    FontAwesome,
    Foundation,
    EvilIcons,
    Ionicons,
    Octicons,
    Feather,
    Entypo,
    Zocial,
}
