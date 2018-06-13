import React from 'react';
// import PropTypes from 'prop-types';
import { Layout } from 'antd';
const { Header : AntdHeader } = Layout;

const Header = () => {
	return (
		<AntdHeader style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
			Said Cacluation
		</AntdHeader>
	)
}

// Header.propTypes = {

// }

export default Header
