#!/bin/bash

set -e

name="$1"

if [[ -z "$name" ]]; then
  echo "Error: no component name" >&2
  exit 1
fi


cat >$name.jsx <<EOF
import React from "react";
import PropTypes from "prop-types";

import "./$name.scss";

export default class $name extends React.PureComponent {
  static propTypes = {};

  static defaultProps = {};

  render() {
    return null;
  }
}
EOF

cat >$name.stories.jsx <<EOF
import React from "react";
import { storiesOf } from "@storybook/react";

import $name from "./$name";

storiesOf("$name", module)
  .add("main", () => {
    return <$name />;
  });
EOF

cat >$name.scss <<EOF
// TODO Sass file for $name
EOF

