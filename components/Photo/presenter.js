import React from "react";
import PropTypes from "prop-types";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Dimensions,
    StyleSheet
} from "react-native";
import FadeIn from "react-native-fade-in-image";
import PhotoActions from "../PhotoActions";
import {withNavigation} from "react-navigation";

const { width, height } = Dimensions.get("window");

const Photo = props => (
    <View style={styles.photo}>
        <TouchableOpacity>
            <View style={styles.header}>
                <FadeIn>
                    <Image
                        source={
                            props.creator.profile_image
                                ? {
                                    uri: props.creator.profile_image
                                }
                                : require("../../assets/noPhoto.jpg")
                        }
                        style={styles.avatar}
                    />
                </FadeIn>
                <View>
                    <Text style={styles.author}>{props.creator.username}</Text>
                    {props.locations && (
                        <Text style={styles.locations}>{props.locations}</Text>
                    )}
                </View>
            </View>
        </TouchableOpacity>
        <FadeIn>
            <Image
                source={{ uri: props.file }}
                style={{ width, height: props.is_vertical ? 600 : 300 }}
            />
        </FadeIn>
        <View style={styles.photoMeta}>
        <PhotoActions isLiked={props.isLiked} likeCount={props.like_count} />
            <View style={styles.comments}>
                <Text style={styles.commentAuthor}>
                    {props.creator.username}{" "}
                    <Text style={styles.message}>{props.caption}</Text>
                </Text>
            </View>
            {props.comments.length > 0 && (
                <TouchableOpacity onPressOut={()=>props.navigation.navigate("Comments")}>
                    <View style={styles.commentsLink}>
                        {props.comments.length === 1 ? (
                            <Text style={styles.linkText}>View 1 comment</Text>
                        ) : (
                                <Text style={styles.linkText}>
                                    View all {props.comments.length} comments
              </Text>
                            )}
                    </View>
                </TouchableOpacity>
            )}
            <Text style={styles.dateText}>{props.natural_time.toUpperCase()}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    photo: {
        width,
        marginBottom: 10
    },
    header: {
        paddingHorizontal: 15,
        flexDirection: "row",
        paddingVertical: 15,
        alignItems: "center",
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flex: 1
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    author: {
        fontWeight: "600",
        marginBottom: 3,
        fontSize: 15
    },
    location: {
        fontSize: 13
    },
    photoMeta: {
        paddingHorizontal: 15
    },
    comment: {
        marginTop: 5
    },
    commentAuthor: {
        marginRight: 5,
        fontWeight: "600",
        fontSize: 14
    },
    message: {
        fontWeight: "400",
        fontSize: 15
    },
    commentsLink: {
        marginTop: 10
    },
    linkText: {
        fontSize: 15,
        color: "#999"
    },
    dateText: {
        fontSize: 12,
        color: "#999",
        marginTop: 10
    }
});





Photo.propTypes = {
    id: PropTypes.number.isRequired,
    creator: PropTypes.shape({
        profile_image: PropTypes.string,
        username: PropTypes.string.isRequired
    }).isRequired,
    locations: PropTypes.string.isRequired,
    file: PropTypes.string.isRequired,
    like_count: PropTypes.number.isRequired,
    caption: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            message: PropTypes.string.isRequired,
            creator: PropTypes.shape({
                profile_image: PropTypes.string,
                username: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    natural_time: PropTypes.string.isRequired,
    is_liked: PropTypes.bool.isRequired,
    is_vertical: PropTypes.bool.isRequired,
};



export default withNavigation(Photo);