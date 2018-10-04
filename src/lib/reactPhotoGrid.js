"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require("lodash.throttle");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO - element resize event is not working
var imageElements = [];

function imageLoadCallback(id, callback) {
    return function (e) {
        callback(id, this.naturalWidth, this.naturalHeight);
    };
}

function getImageDimensions(src, id, cb) {
    var img = new Image();
    img.id = id;
    imageElements.push(img);
    img.addEventListener("load", imageLoadCallback(id, cb));

    img.src = src;
}

function isObject(obj) {
    return obj !== null && typeof obj === "Object";
}

function isString(str) {
    return typeof str === "string";
}

function first(arr) {
    return arr[0];
}

function without(arr, exclude) {
    return arr.filter(function (item) {
        return item !== exclude;
    });
}

function findIndex(arr, pred) {
    return arr.reduce(function (acc, val, index) {
        if (acc >= 0) {
            return acc;
        }

        return pred(val) ? index : acc;
    }, -1);
}

function all(arr, pred) {
    return arr.reduce(function (acc, item) {
        return pred(item) && acc;
    }, true);
}

function max(arr, iteratee) {
    return arr.reduce(function (acc, item) {
        if (iteratee(item) > iteratee(acc)) {
            return item;
        } else {
            return acc;
        }
    }, arr[0]);
}

var ReactPhotoGrid = (_temp = _class = function (_React$Component) {
    _inherits(ReactPhotoGrid, _React$Component);

    function ReactPhotoGrid(props) {
        _classCallCheck(this, ReactPhotoGrid);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        var containerWidth = 500,
            containerHeight = 500;

        if (_this.props.gridSize) {
            var container = _this.props.gridSize.split("x");
            containerWidth = container[0] || 500;
            containerHeight = container[1] || 500;
        }

        var imageData = _this.props.data.length <= 4 ? _this.props.data : first(_this.props.data, 4);
        console.log('imageData 1', imageData);

        // take care of variations in property data
        // if someone just passes an array of path strings
        if (imageData[0] && isString(imageData[0])) {
            imageData = imageData.map(function (imagePath, index) {
                return {
                    id: Math.random() * 1000,
                    path: imagePath,
                    index: index
                };
            });
        } else if (imageData[0]) {
            console.log('imageData', imageData);
            imageData = imageData.map(function (image, index) {
                return _extends({
                    id: image.id,
                    path: image.src, // in case someone supplies a src property instead of path
                    index: index
                }, image);
            });
        }

        var state = {
            ladyLuck: Math.floor(Math.random() * 2),
            containerWidth: containerWidth,
            containerHeight: containerHeight,
            imagesToShow: imageData
        };

        if (_this.props.containerWidth) {
            state.containerWidth = _this.props.containerWidth;
        }

        _this.state = state;

        _this.onResize = (0, _lodash2.default)(_this.onResize.bind(_this), 16.667);
        _this.handleImageClick = _this.handleImageClick.bind(_this);
        _this.recalculateGrid = _this.recalculateGrid.bind(_this);
        _this.getComponentStyles = _this.getComponentStyles.bind(_this);
        return _this;
    }

    ReactPhotoGrid.prototype.componentWillUnmount = function componentWillUnmount() {
        var scope = this;
        imageElements.forEach(function (imageElement) {
            imageElement.removeEventListener("load", imageLoadCallback(imageElement.id, scope.recalculateGrid));
        });
    };

    ReactPhotoGrid.prototype.componentDidMount = function componentDidMount() {
        var scope = this;
        this.state.imagesToShow.forEach(function (image, index) {
            getImageDimensions(image.path, image.id, scope.recalculateGrid);
        }, this);

        // only set it to parents width/height if no gridsize is provided
        if (!this.props.gridSize) {
            this.setState({
                containerWidth: _reactDom2.default.findDOMNode(this).offsetWidth,
                containerHeight: _reactDom2.default.findDOMNode(this).offsetWidth
            });
        }

        // $(ReactDOM.findDOMNode(this)..resize(this.onResize);
        // elementResizeEvent(ReactDOM.findDOMNode(this). this.onResize);
    };

    // Throttle updates to 60 FPS.


    ReactPhotoGrid.prototype.onResize = function onResize() {
        this.setState({
            containerWidth: _reactDom2.default.findDOMNode(this).offsetWidth,
            containerHeight: _reactDom2.default.findDOMNode(this).offsetWidth
        });
    };

    ReactPhotoGrid.prototype.handleImageClick = function handleImageClick(imageId, event) {
        this.props.onImageClick && this.props.onImageClick(imageId, event);
    };

    ReactPhotoGrid.prototype.recalculateGrid = function recalculateGrid(id, width, height) {
        var _imagesToShow = [].concat(this.state.imagesToShow);

        var imageIndex = findIndex(_imagesToShow, function (image) {
            return image.id === id;
        });
        _imagesToShow[imageIndex].width = width;
        _imagesToShow[imageIndex].height = height;
        var indexForMaxDimensionImage = 0;
        var container = {
            width: this.state.containerWidth,
            height: this.state.containerHeight
        };

        var contenders = ["Width", "Height"];
        var winner = contenders[this.state.ladyLuck].toLowerCase();
        var loser = first(without(contenders, contenders[this.state.ladyLuck])).toLowerCase();

        // if all the images have width and height, we can rotate the array around the image with max height,
        // so that the first image has the max height and can be displayed properly on the left side
        if (all(_imagesToShow, function (image) {
            return image.width && image.height;
        })) {
            // TODO - the logic should not only look the the image with max height but with height >= containerHeight and max(height/width ratio)

            var maxDimensionImage = max(_imagesToShow, function (image) {
                return image[winner];
            });

            indexForMaxDimensionImage = findIndex(_imagesToShow, function (image) {
                return image.id === maxDimensionImage.id;
            });

            if (_imagesToShow[indexForMaxDimensionImage][winner] < container[winner]) {
                container[winner] = _imagesToShow[indexForMaxDimensionImage][winner];
                container[loser] = container[winner];
            }

            var indexForBestMaxImage = _imagesToShow.reduce(function (result, image, index) {
                if (image[winner] >= container[winner] && image[winner] / image[loser] > _imagesToShow[result][winner] / _imagesToShow[result][loser]) {
                    return index;
                }
                return result;
            }, 0);

            _imagesToShow.push.apply(_imagesToShow, _imagesToShow.splice(0, indexForBestMaxImage));
            this.setState({
                imagesToShow: _imagesToShow,
                containerHeight: container.height,
                containerWidth: container.width
            });
        }
    };

    ReactPhotoGrid.prototype.getComponentStyles = function getComponentStyles(images) {
        var numberOfImages = images.length;
        
        var marginSetters = ["Bottom", "Right"];
        var contenders = ["Width", "Height"];
        var winner = contenders[this.state.ladyLuck];
        var loser = first(without(contenders, winner));
        var marginWinner = marginSetters[this.state.ladyLuck];
        var marginLoser = first(without(marginSetters, marginWinner));

        var smallestDimensionRaw = Math.floor(this.state["container" + winner] / (numberOfImages - 1));
        var margin = 2;
        var smallImageDimension = smallestDimensionRaw - margin;
        var styles = [];
        var commonStyle = {
            display: "inline-block",
            position: "relative",
            overflow: "hidden",
            float: "left",
            verticalAlign: "top",
            cursor: "pointer"
        };

        switch (numberOfImages) {
            case 0:
                break;
            case 1:
                // set some big numbers in case width and height not provided
                if (!images[0].width) images[0].width = 1000000;
                if (!images[0].height) images[0].height = 1000000;

                if (images[0].width > images[0].height) {
                    styles = [{
                        width: Math.min(this.state.containerWidth, images[0].width) - margin,
                        height: Math.min(this.state.containerWidth, images[0].width) * images[0].height / images[0].width - margin,
                        margin: margin
                    }];
                } else {
                    styles = [{
                        width: Math.min(this.state.containerHeight, images[0].height) * images[0].width / images[0].height - margin,
                        height: Math.min(this.state.containerHeight, images[0].height) - margin,
                        margin: margin
                    }];
                }
                break;
            case 2:
                styles[0] = styles[1] = {};

                styles[0][winner.toLowerCase()] = styles[1][winner.toLowerCase()] = this.state["container" + winner] - margin;
                styles[0][loser.toLowerCase()] = styles[1][loser.toLowerCase()] = Math.min(smallImageDimension / 2) - margin;
                styles[0]["margin" + marginWinner] = margin;
                break;
            default:
                styles[0] = {};
                styles[0][winner.toLowerCase()] = this.state["container" + winner];
                styles[0][loser.toLowerCase()] = smallImageDimension * (numberOfImages - 2);
                styles[0]["margin" + marginWinner] = margin;
                var styleForSmallerImages = {
                    width: smallImageDimension,
                    height: smallImageDimension
                };
                styleForSmallerImages["margin" + marginLoser] = margin;

                for (var i = 1; i < numberOfImages && i < 4; i++) {
                    // cloning is important here because otherwise changing the dimension of last image changes it for everyone
                    styles.push(_extends({}, styleForSmallerImages));
                }
                // adjust the width/height of the last image in case of round off errors in division
                styles[numberOfImages - 1][winner.toLowerCase()] += styles[0][winner.toLowerCase()] - smallImageDimension * (numberOfImages - 1) - margin * (numberOfImages - 2);
                styles[numberOfImages - 1]["margin" + marginLoser] = 0;
        }

        return styles.map(function (style) {
            return _extends({}, commonStyle, style);
        });
    };

    ReactPhotoGrid.prototype.render = function render() {
        var componentStyles = this.getComponentStyles(this.state.imagesToShow);

        var images = this.state.imagesToShow.map(function (image, index) {
            var componentStyle = componentStyles[index];

            // max width and height has to be dynamic depending on this image's dimensions
            var imageStyle;

            if (image.width && image.height) {
                if (image.width <= componentStyle.width || image.height <= componentStyle.height) {
                    // do nothing
                } else if (image.width / componentStyle.width < image.height / componentStyle.height) {
                    imageStyle = {
                        maxWidth: componentStyle.width
                    };
                } else {
                    imageStyle = {
                        maxHeight: componentStyle.height
                    };
                }
            }

            return _react2.default.createElement(
                "div",
                { key: "image_" + index, style: componentStyle },
                _react2.default.createElement("img", {
                    style: imageStyle,
                    src: image.path,
                    onClick: this.handleImageClick.bind(this, image.id, image)
                })
            );
        }, this);

        var containerStyle = {
            width: this.state.containerWidth,
            height: this.state.containerWidth,
            backgroundColor: "white"
            // the outer div is needed so that container width can be recalculated based on the parent container width (which the outer div inherits
            // the div inside the outer div is assigned a width in the first render itself. so that doesn't work out while trying to reset container width
        };return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
                "div",
                { style: containerStyle },
                images,
                _react2.default.createElement("div", { style: { clear: "both" } })
            )
        );
    };

    return ReactPhotoGrid;
}(_react2.default.Component), _class.defaultProps = {
    data: []
}, _temp);


ReactPhotoGrid.propTypes = process.env.NODE_ENV !== "production" ? {
    data: _propTypes2.default.array.isRequired,
    gridSize: _propTypes2.default.string,
    onImageClick: _propTypes2.default.func
} : {};

exports.default = ReactPhotoGrid;
module.exports = exports["default"];