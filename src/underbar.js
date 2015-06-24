(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    // Last element
    var end = array.length - 1;
    // Start point for slicing
    var index = array.length - n;

    // If n is not given
    if(n === undefined) {
      // Return the last element in the array, only
      return array[end];
    // Otherwise, if n is larger than the arrays' length  
  } else if (n > end) {
      // Return the entire array
      return array;
    // Otherwise, just do what the function was intended to do
  } else {
    return array.slice(index, n + 1);
  }
};

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    // if the collectiton is an Array
    if(Array.isArray(collection) === true){
      // Use a "for-i" loop to access each array element
      for(var i = 0; i < collection.length; i++){
        // Callback on whatever you intended to do the element
        iterator(collection[i], i, collection);
      }
    // If the collection is an Object
  } else {
      // Use a "for-in" loop to access each object property
      for(var key in collection) {
        // Do whatever you intend to do to each property
        iterator(collection[key], key, collection);
      }

    }
      // The each function doesn't return anything
    };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    // Initialize the query result to a "falsy" value
    var result = -1;

    // Iterate through the array
    _.each(array, function(item, index) {
      // If the iterator finds the item you're looking..
      if (item === target && result === -1) {
        // Change the result from "falsy" to the index of that element
        result = index;
      } // Otherwise, the result will jsut remain false
    });

    // Return the result of your query
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    // Returned array
    var filteredArray = [];

    // Looping through collection testing each element
    _.each(collection, function(val){
      // If the particular element passes the test 
      if(test(val)){
        // Push the element into the filtered array
        filteredArray.push(val);
      }
    });
    // Retrun the filtered array with the items that passed the test
    return filteredArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    // Check out the _.filter function, it's basically the reverse of that 
    return _.filter(collection, function(val){
      if(!test(val)){
         // This function just returns each value directly to an array
         return val;
       }
     });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    // Sorts the input array
    var sortedArr = array.sort();
    
    // Creates a new array to which we will push the uniq values
    var uniqArr = [];

    // Loops throught the collection giving the element and index 
    _.each(sortedArr, function(previous, current){
      // If the previous element is not identical to the current 
      if(previous !== sortedArr[current+1]){
        // Push it into the uniq array
        uniqArr.push(sortedArr[current]);
      }
    });
    // Return the new, uniq array
    return uniqArr;

  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
// Create an array to return the change collection to 
var mappedArr = [];

    // Iterate throug the collection 
    _.each(collection, function(val){
      // Apply the callback to each element of the collection and push it into the new array
      mappedArr.push(iterator(val));
    });
    // Return the new array
    return mappedArr;

    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {

      // If the function is not given a start value
      if(accumulator === undefined){
       // Create count to allow us to skip the first elemebt  
       var count = 1;
       // Set the accumulationto the first element of the array
       accumulator = collection[0];
       // Loop through the array
       _.each(collection, function(val, index){
         // While the count is less than the arrays length
         while(count < collection.length){
         // Append the value of the iterator to the accumulator, skipping the first element 
         accumulator = iterator(accumulator, collection[count]);
         // Increment the count so we get the values we need and no endless loop
         count++;
       }
     });
      // If there is a start value given 
    } else {
       // Loop through the collection
       _.each(collection, function(val){
         // Append the value of the callback applied to the accumualtor and the element
         accumulator = iterator(accumulator, val);
       });
     }   
       // Return the reduced value(s)
       return accumulator;     

     };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };



  
  // Determine whether all of the elements match a truth test.
  // 1. Passes by default for an empty collection - done!
  // 2. Passes for a collection all-truthy results - done!
  // 3. Fails for a collection of falsy results - done!
  // 4. Fails for a collection containing falsy and truthy results - WORKING!
  // 5. SHould work when provided a collection containing undefined values - done!
  // 6. Should cast the result to a boolean - done!
  // 7. Should handle callbacks that manipulate input - WORKING!
  // 8. Should work when no callback is provided - done!
  //console.log(_.isEven); 
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    

    //console.log(collection);
    var boolTest = true;
    if(collection.length === 0){
      return boolTest;
    }
    var test = true; 

    if(iterator === undefined){
     iterator = function(current){
      if(current !== true || current === undefined || current < 1){
        return false;
      } else {
        return true;
      }
    }
  }



  var result = null;
  var newCollection = _.map(collection, function(val){

    if(iterator(val) === !true || iterator(val) === false || iterator(val) < 1 || iterator(val) === undefined){
      result = false;

    } else {
      result = true;
    }
    return result;

  });

  boolTest = _.reduce(newCollection, function(previous, current){
   return previous && current;                 
 });  


  if(!boolTest || boolTest < 1){
    boolTest = false;
  } else {    
    boolTest = true;
  }

  

  return boolTest;
};

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
 

    var boolTest = false;
    if(collection.length === 0){
      return boolTest;
    }
    var test = true; 

    if(iterator === undefined){
     iterator = function(current){
      if(current !== true || current === undefined || current < 1){
        return false;
      } else {
        return true;
      }
    }
  }

  var result = null;
  var newCollection = _.map(collection, function(val){

    if(iterator(val) === !true || iterator(val) === false || iterator(val) < 1 || iterator(val) === undefined){
      result = false;

    } else {
      result = true;
    }
    return result;

  });

  boolTest = _.reduce(newCollection, function(previous, current){
   return previous || current;                 
 });  


  if(!boolTest || boolTest < 1){
    boolTest = false;
  } else {    
    boolTest = true;
  }

  return boolTest;
  
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
_.extend = function(obj) {
  var newObj = arguments[0];
  var argLength = arguments.length;

  _.each(arguments, function(arrVal, index){
    _.each(arrVal, function(objProp, key){
      newObj[key] = objProp;

      //console.log(newObj)

    });
  });

  return newObj;
};

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    // No condition for undefined arguments
    var newObj = arguments[0];
    var argLength = arguments.length;

    _.each(arguments, function(arg){
      _.each(arg, function(val, key){
        //console.log(arg, val, key);

        if (!newObj.hasOwnProperty(key)){

          newObj[key] = val;
        }

       

    });
  });

  return newObj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    //console.log(re);

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
        console.log('Result', result);
      }
      //console.log(result);
      // The new function always returns the originally computed result.
      return result;
    };
  };

  



// var memo ={};

// function cheatInc(num){
//   // if(!memo.hasOwnProperty(num)){
//   //    return memo[num] = num++;
     
//   // } 

//   // return memo[num];

// return memo.hasOwnProperty(num) ? memo[num] : (memo[num] = num++);
//     // Not for falsy values
// // return memo[num] || (memo[num] = num++);


// }

  
//saljdfghajdshjkh
  
  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  
  _.memoize = function(func) {
    var memoObj = {};
    var key;    
    
    return function() {
      
      key = "" + Array.prototype.slice.call(arguments);

      return memoObj.hasOwnProperty(key) ? memoObj[key] : (memoObj[key] = func.apply(this, arguments));
    };

    // var alreadyCalled = false;
    // var result;
    // var result;
    // //console.log(result);
    // return function() {
    //   //result1 = func(result);

    //   if (!alreadyCalled) {

    //     result = func.apply(this, arguments);
    //     alreadyCalled = true;
    //   }
    //   console.log(result);
      // if(!alreadyCalled && !result){
        //console.log('Hi');

      //}
      
    //   return result;
    // }


  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    //var funcArgs = func.apply(this, arguments);
    var funcArgs = [].slice.call(arguments, 2);


    // for(var i = 2; i < arguments.length; i++){
    //     funcArgs.push(arguments[i]);
    // }

    return setTimeout(function(){return func.apply(null, funcArgs);}, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
