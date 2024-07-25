const SeeReviewPopup = ({ isOpen, onClose, review }) => {
    if (!review) return null;

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 9999 }}>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg max-w-lg mx-auto space-y-4">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold dark:text-gray-200">Customer Review</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                        >
                            
                        </button>
                    </div>
                    <div>
                        <strong className="block text-lg mb-1">Comment:</strong>
                        <p>{review.comment}</p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={onClose}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default SeeReviewPopup;
