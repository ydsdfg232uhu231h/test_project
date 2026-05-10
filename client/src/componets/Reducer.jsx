const reducer = (state, action) => {
    switch (action.type) {
        case "All":
            return {
                ...state,
                category: action.payload || state.category,
                filtered: action.payload || state.category
            };
        case "Fashion and Apparel":
            return {
                ...state,
                filtered: state.category.filter(p => p.category === "Fashion and Apparel")
            }

        case "Consumer Electronics":
            return {
                ...state,
                filtered: state.category.filter(p => p.category === "Consumer Electronics")
            }

        case "Beauty and Personal Care":
            return {
                ...state,
                filtered: state.category.filter(p => p.category === "Beauty and Personal Care")
            }

        case "Home and Kitchen Appliances":
            return {
                ...state,
                filtered: state.category.filter(p => p.category === "Home and Kitchen Appliances")
            }

        case "Mobile Accessories":
            return {
                ...state,
                filtered: state.category.filter(p => p.category === "Mobile Accessories")
            }

        case "Health and Personal Care":
            return {
                ...state,
                filtered: state.category.filter(p => p.category === "Health and Personal Care")
            }

        case "Fitness and Wellness":
            return {
                ...state,
                filtered: state.category.filter(p => p.category === "Fitness and Wellness")
            }

        case "Baby and Kids":
            return {
                ...state,
                filtered: state.category.filter(p => p.category === "Baby and Kids")
            }

        case "Pet Supplies":
            return {
                ...state,
                filtered: state.category.filter(p => p.category === "Pet Supplies")
            }

        case "Automotive Accessories":
            return {
                ...state,
                filtered: state.category.filter(p => p.category === "Automotive Accessories")
            }

        default:
            return state;
    }
};

export default reducer;
