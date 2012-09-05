
function initialize_compressor() {
	compressor=new LZMA( "js/lzma_worker.js" );
	return compressor;
}

function initialize_helper() {
}

function load_url_code() {
	if ( window.location.hash ) {

		var hash = window.location.hash.substr( 1 );
		var version = hash.substr( 0, 2 );

		if ( version == 'A/' ) {

			// LZMA

			readURL( hash.substr( 2 ) );

		} else {

			// Basic format

			code.value = decodeURIComponent( hash );

		}

	} else {

		//readURL( '5d00000100da0200000000000000119a48c65ab5aec1f910f780dfdfe473e599a211a90304ab6aa581b342b344db4e71099beb79352b3c442c8dee970ffb4d054491e356b4f55882c2f3b7932067582966ef97d8f5e358e8583eeb73be7fe47fd03e5c4584b4ce5fa131e31344ff83bf8ec756f45420d54f60a06d4fc2dda266ae71986333256b3ede7e39aa94b2fe2c4861076b9176c77ef8355e7285514234c59ef345d843dd228d9140528bf2faf5f85a51066bc5f5ea1fed8d7271bbfcf276b8cb33054e9a2bdb34abb51085c58902e2ab76491976a130318872b8b8e7398f598bfc8c65a67e2871c54de93d2920b0e2b042936c11f66a90a944a50e69118e664e3fca3422a3a147183f6ab7f4ce88ce652bfb6537b7cb6cc3d0e90263cb06e19921e6c9bbd8c501a01d1424ade746d3ea0957feff784c591c7462ffae6ef184' );
			 //readURL( '5d00000100480300000000000000119a48c65ab5aec1f910f780dfdfe473e599a211a90304ab6aa581b342b344db4e71099beb79352b3c442c8dee970ffb4d054491e356b4f55882c2f3b7932067582868e7828b1b5fca4820fd4f8a9e828a1edec537a50b7e952c6a6a05a6a8cc1a9088e04601179671c26d277157e5c604817a99392991944a4a7d147b01144158dc063b6d4583f34c69f95f1e8f3daa1ce9db706b3b525c5228d5eb048be99fdbefb321153e02d1b19864d522d322c3584b2a9e9d5a3861c80daaa3f4da645e6cb0e2f6c0258add22574f24c89d711224ab4f8521db53c06fea69d3378b6d10632698a5c728c31585097261552dd3db0e8a92c92ce7311c4866fef88571921875cd1666358166fb22864dffb081a2451a2259fac434cc7a88059a4e0f8747706d53cb3b67431dee6fc0e1ba5c1c798acbf252ff8b811380');
	readURL( '5d00000100730300000000000000119a48c65ab5aec1f910f780dfdfe473e599a211a90304ab6aa581b342b344db4e71099beb79352b3c442c8dee970ffb4d054491e356b4f55882c2f3b7932067582868e7828b1b5fca4820fd4f8a9e828a1edec537a50b7e952c6a6a05a6a8cc1a9088e04601179671c26d277157e5c604817a99392991944a4a7d147b01144158dc063b6d4583f34c69f95f1e8f3daa1ce9db706b3b525c5228d5eb048be99fdbefb321153e02d1b19864d522d322c3584b2a9e9d5a3861c80daaa3f4da645e6cb0e2f6c0258add22574f24c89d711224ab4f8521db53c06fea69d3378b6d10632698a5c728c31585097261552dd3db0e8a92c92ce7311c4866fef88571921875cd1666358166fcaca4e6e5fe36e4a0034bc4bb6fae9960d97a448b321cb7d0a64c5bbeab6dea7cd478386da17c7f59ff6cbb2e3f0c19d5ea504d937a8c717dd67bf0b2cdffdb691107');
	}
}

function setURL( shaderString ) {

	compressor.compress( shaderString, 1, function( bytes ) {

		var hex = convertBytesToHex( bytes );
		window.location.replace( '#A/' + hex );

	},
	dummyFunction );

}

function readURL( hash ) {

	var bytes = convertHexToBytes( hash );

	compressor.decompress( bytes, function( text ) {

		compileOnChangeCode = false;  // Prevent compile timer start
		code.setValue(text);
		compile();
		compileOnChangeCode = true;

	},
	dummyFunction );

}

function convertHexToBytes( text ) {

	var tmpHex, array = [];

	for ( var i = 0; i < text.length; i += 2 ) {

		tmpHex = text.substring( i, i + 2 );
		array.push( parseInt( tmpHex, 16 ) );

	}

	return array;

}

function convertBytesToHex( byteArray ) {

	var tmpHex, hex = "";

	for ( var i = 0, il = byteArray.length; i < il; i ++ ) {

		if ( byteArray[ i ] < 0 ) {

			byteArray[ i ] = byteArray[ i ] + 256;

		}

		tmpHex = byteArray[ i ].toString( 16 );

		// add leading zero

		if ( tmpHex.length == 1 ) tmpHex = "0" + tmpHex;

		hex += tmpHex;

	}

	return hex;

}

// dummy functions for saveButton
function set_save_button(visibility) {
}

function set_parent_button(visibility) {
}

function add_server_buttons() {
}

