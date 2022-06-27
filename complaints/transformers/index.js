const complaintTransformer = (complaint) => {
    return complaint
}

const complaintsTransformer = (complaints) => {
    return complaints.map((c) => complaintTransformer(c))
}

module.exports = {
    complaintTransformer,
    complaintsTransformer
}