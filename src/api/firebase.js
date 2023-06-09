import {
	collection,
	onSnapshot,
	doc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { db } from './config';
import { getFutureDate, getDaysBetweenDates } from '../utils';
import { calculateEstimate } from '@the-collab-lab/shopping-list-utils';

/**
 * Subscribe to changes on a specific list in the Firestore database (listId), and run a callback (handleSuccess) every time a change happens.
 * @param {string} listId The user's list token
 * @param {Function} handleSuccess The callback function to call when we get a successful update from the database.
 * @returns {Function}
 *
 * @see https://firebase.google.com/docs/firestore/query-data/listen
 */
export function streamListItems(listId, handleSuccess) {
	const listCollectionRef = collection(db, listId);
	return onSnapshot(listCollectionRef, handleSuccess);
}

/**
 * Read the information from the provided snapshot and return an array
 * that can be stored in our React state.
 * @param {Object} snapshot A special Firebase document with information about the current state of the database.
 * @returns {Object[]} An array of objects representing the user's list.
 */
export function getItemData(snapshot) {
	/**
	 * Firebase document snapshots contain a `.docs` property that is an array of
	 * document references. We use `.map()` to iterate over them.
	 * @see https://firebase.google.com/docs/reference/js/firestore_.documentsnapshot
	 */
	return snapshot.docs.map((docRef) => {
		/**
		 * We call the `.data()` method to get the data
		 * out of the referenced document
		 */
		const data = docRef.data();

		/**
		 * The document's ID is not part of the data, but it's very useful
		 * so we get it from the document reference.
		 */
		data.id = docRef.id;

		return data;
	});
}

/**
 * Add a new item to the user's list in Firestore.
 * @param {string} listId The id of the list we're adding to.
 * @param {Object} itemData Information about the new item.
 * @param {string} itemData.itemName The name of the item.
 * @param {number} itemData.daysUntilNextPurchase The number of days until the user thinks they'll need to buy the item again.
 */
export async function addItem(listId, { itemName, daysUntilNextPurchase }) {
	const listCollectionRef = collection(db, listId);
	// TODO: Replace this call to console.log with the appropriate
	// Firebase function, so this information is sent to your database!
	const docRef = await addDoc(listCollectionRef, {
		dateCreated: new Date(),
		// NOTE: This is null because the item has just been created.
		// We'll use updateItem to put a Date here when the item is purchased!
		dateLastPurchased: null,
		dateNextPurchased: getFutureDate(daysUntilNextPurchase),
		name: itemName,
		totalPurchases: 0,
	});

	return docRef;
}

export async function updateItem(
	listId,
	documentId,
	totalPurchases,
	dateLastPurchased,
	dateNextPurchased,
	dateCreated,
) {
	const itemRef = doc(db, listId, documentId);
	const dateLastPurchasedInMs = dateLastPurchased
		? dateLastPurchased.toDate()
		: dateCreated.toDate();

	const getDaysBetweenLastPurchase = getDaysBetweenDates(
		Date.now(),
		dateLastPurchasedInMs,
	);

	const getDaysBetweenNextPurchase = getDaysBetweenDates(
		dateNextPurchased.toDate(),
		dateLastPurchasedInMs,
	);

	const estimate = calculateEstimate(
		getDaysBetweenNextPurchase,
		getDaysBetweenLastPurchase,
		totalPurchases,
	);

	const updatedDocRef = await updateDoc(itemRef, {
		dateLastPurchased: new Date(),
		totalPurchases: ++totalPurchases,
		dateNextPurchased: getFutureDate(estimate),
	});

	return updatedDocRef;
}

export async function deleteItem(documentId, listToken) {
	const docRef = doc(db, listToken, documentId);

	const deleteItemRef = await deleteDoc(docRef);

	return deleteItemRef;
}

export function comparePurchaseUrgency(shoppingList) {
	// Loop though the shopping list and for each item and calculate days until next purchase and days since last purchase
	// Store days until next purchase into property item.purchaseUrgency (to use later for sort)
	// Based number of days we can label each item
	// Return sorted array: 1) active first inactive last 2) purchaseUrgency (days until next purchase) ascending 3) alphabetical

	shoppingList.map((item) => {
		let daysUntilNextPurchase;
		let daysSinceLastPurchase;

		if (item.dateNextPurchased) {
			daysUntilNextPurchase = getDaysBetweenDates(
				item.dateNextPurchased.toMillis(),
				Date.now(),
			);
			item.purchaseUrgency = daysUntilNextPurchase;
			if (daysUntilNextPurchase <= 7) {
				item.urgencyLabel = 'soon';
			} else if (daysUntilNextPurchase > 7 && daysUntilNextPurchase < 30) {
				item.urgencyLabel = 'kind of soon';
			} else {
				item.urgencyLabel = 'not soon';
			}
		}

		if (item.dateLastPurchased) {
			daysSinceLastPurchase = getDaysBetweenDates(
				Date.now(),
				item.dateLastPurchased.toMillis(),
			);
			if (daysSinceLastPurchase > 60) {
				item.urgencyLabel = 'inactive';
			}
		}

		if (item.dateLastPurchased && item.dateNextPurchased) {
			// consider what happens when an item’s dateNextPurchased has passed, but it isn’t yet inactive.

			if (daysSinceLastPurchase < 60 && daysUntilNextPurchase < 0) {
				item.urgencyLabel = 'overdue';
			}
		}

		return item;
	});
	return shoppingList.sort((a, b) => {
		//sort by active/inactive first
		if (a.urgencyLabel === 'inactive' && b.urgencyLabel !== 'inactive') {
			return 1;
		}
		if (a.urgencyLabel !== 'inactive' && b.urgencyLabel === 'inactive') {
			return -1;
		}
		//sort by purchase urgency (days until next purchase) ascending 3) alphabetical
		if (a.purchaseUrgency !== b.purchaseUrgency) {
			return a.purchaseUrgency - b.purchaseUrgency;
		}

		//sort alhpabetically
		return a.name.localeCompare(b.name);
	});
}
