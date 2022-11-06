import { h } from "preact";
import { signal, batch, computed } from "@preact/signals";

export default function Calculator() {
  const income = signal('');
  const hours = signal('');
  const rent = signal('');
  const transport = signal('');
  const food = signal('');
  const utilities = signal('');
  const insurance = signal('');
  const software = signal('');
  const entertainment = signal('');
  const other = signal('');
  const month = signal(0);
  const day = signal(0);
  const hour = signal(0);
  const remain = signal(0);
  const time = signal(0);
  const savings = signal(0);
  const burnRate = signal(0);


  function calculate(e) {
    e.preventDefault();
   batch(() => {
    income.value = computed(() =>
    parseFloat(document.getElementById("income").value)
  );
  rent.value = computed(() =>
    parseFloat(document.getElementById("rent").value)
      ? parseFloat(document.getElementById("rent").value)
      : ''
  );
  transport.value = computed(() =>
    parseFloat(document.getElementById("transport").value)
      ? parseFloat(document.getElementById("transport").value)
      : ''
  );
  food.value = computed(() =>
    parseFloat(document.getElementById("food").value)
      ? parseFloat(document.getElementById("food").value)
      : ''
  );
  utilities.value = computed(() =>
    parseFloat(document.getElementById("utilities").value)
      ? parseFloat(document.getElementById("utilities").value)
      : ''
  );
  insurance.value = computed(() =>
    parseFloat(document.getElementById("insurance").value)
      ? parseFloat(document.getElementById("insurance").value)
      : ''
  );
  software.value = computed(() =>
    parseFloat(document.getElementById("software").value)
      ? parseFloat(document.getElementById("software").value)
      : ''
  );
  entertainment.value = computed(() =>
    parseFloat(document.getElementById("entertainment").value)
      ? parseFloat(document.getElementById("entertainment").value)
      : ''
  );
  other.value = computed(() =>
    parseFloat(document.getElementById("other").value)
      ? parseFloat(document.getElementById("other").value)
      : ''
  );
   })

    batch(() => {
      month.value =
        rent.value +
        transport.value +
        food.value +
        utilities.value +
        insurance.value +
        software.value +
        entertainment.value +
        other.value;
      day.value = computed(() => Math.ceil(month.value / 30));
      hour.value = computed(() => Math.ceil(day.value / 24));
      remain.value = computed(() => income - month.value);
      time.value = computed(() => Math.ceil(360 - hours.value));
      savings.value = computed(() => Math.ceil((remain.value / income) * 100));
      burnRate.value = computed(() => Math.ceil(remain.value / day.value));
    });
  }

  function reset(e) {
    e.preventDefault();
    batch(() => {
      month.value = computed(() => 0)
      day.value = computed(() => 0)
      hour.value = computed(() => 0)
      remain.value = computed(() => 0)
      time.value = computed(() => 0)
      savings.value = computed(() => 0)
      burnRate.value = computed(() => 0)

    });
  }

  return (
    <div class="grid md:grid-cols-2 gap-20 my-10">
      <form id="expenses-form">
        <div class="grid md:grid-cols-2 mt-10 md:mt-5 gap-5 md:gap-10">
          <div>
            <h5 class="text-xl">Income</h5>
            <h6 class="text-gray-500">monthly</h6>
          </div>
          <div>
            <input
              type="text"
              id="income"
              name="income"
              value={income}
              class="form-control bg-transparent border-b rounded-0 text-white block w-full"
              placeholder="10000"
            />
          </div>
        </div>

        <div class="grid md:grid-cols-2 mt-20 md:mt-5 gap-5 md:gap-10">
          <div>
            <h5 class="text-xl">Hours</h5>
            <h6 class="text-gray-500">of work, monthly</h6>
          </div>
          <div>
            <input
              name="hrsworked"
              type="text"
              id="hrsworked"
              value={hours}
              class="form-control bg-transparent border-b rounded-0 text-white block w-full"
              placeholder="120"
            />
          </div>
        </div>

        <div class="grid md:grid-cols-2 mt-20 md:mt-5 gap-5 md:gap-10">
          <div>
            <h5 class="text-xl">Expenses</h5>
            <h6 class="text-gray-500">monthly</h6>
          </div>
          <div>
            <input
              type="text"
              id="rent"
              value={rent}
              class="mt-4 form-control bg-transparent border-b rounded-0 text-white block w-full"
              placeholder="Rent"
            />

            <input
              type="text"
              id="transport"
              value={transport}
              class="mt-4 form-control bg-transparent border-b rounded-0 text-white block w-full"
              placeholder="Transportation"
            />

            <input
              type="text"
              id="food"
              value={food}
              class="mt-4 form-control bg-transparent border-b rounded-0 text-white block w-full"
              placeholder="Food"
            />

            <input
              type="text"
              id="utilities"
              value={utilities.value}
              class="mt-4 form-control bg-transparent border-b rounded-0 text-white block w-full"
              placeholder="Utilities"
            />

            <input
              type="text"
              id="insurance"
              value={insurance.value}
              class="mt-4 form-control bg-transparent border-b rounded-0 text-white block w-full"
              placeholder="Insurance"
            />

            <input
              type="text"
              id="software"
              value={software}
              class="mt-4 form-control bg-transparent border-b rounded-0 text-white block w-full"
              placeholder="Software"
            />
            <input
              type="text"
              id="entertainment"
              value={entertainment}
              class="mt-4 form-control bg-transparent border-b rounded-0 text-white block w-full"
              placeholder="Entertainment"
            />

            <input
              type="text"
              id="other"
              value={other}
              class="mt-4 form-control bg-transparent border-b rounded-0 text-white block w-full"
              placeholder="Other"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-x-7 mt-10">
          <button
            onClick={reset}
            type="reset"
            id="reset"
            class="border p-2 rounded-none"
          >
            Reset
          </button>
          <button
            onClick={calculate}
            type="submit"
            id="submit"
            class="border p-2 rounded-none plac"
          >
            Submit
          </button>
        </div>
      </form>

      <div>
        <div class="grid grid-cols-2 mt-3 gap-10">
          <div>
            <h5 class="text-xl">Cost of Living:</h5>
            <h6 class="text-gray-500">per month</h6>
          </div>
          <div>
       
              <p class="text-end text-xl">
                ${month}
              </p>
        
         
          </div>
        </div>
        <div class="grid grid-cols-2 mt-3 gap-10">
          <div>
            <h5 class="text-xl">Cost of Living:</h5>
            <h6 class="text-gray-500">per day</h6>
          </div>
          <div>
          
          <p class="text-end text-xl">
                ${day}
              </p>
          
          </div>
        </div>
        <div class="grid grid-cols-2 mt-3 gap-10">
          <div>
            <h5 class="text-xl">Cost of Living:</h5>
            <h6 class="text-gray-500">per hour</h6>
          </div>
          <div>
           
          <p class="text-end text-xl">
                ${hour}
              </p>
        
          </div>
        </div>
        <div class="grid grid-cols-2 mt-3 gap-10">
          <div>
            <h5 class="text-xl">Cash Remaining:</h5>
            <h6 class="text-gray-500">savings</h6>
          </div>
          <div>
          
          <p class="text-end text-xl">
                ${remain}
              </p>
          
          </div>
        </div>
        <div class="grid grid-cols-2 mt-3 gap-10">
          <div>
            <h5 class="text-xl">Time Surplus:</h5>
            <h6 class="text-gray-500">hours</h6>
          </div>
          <div>
            
          <p class="text-end text-xl">
                {time}
              </p>
         
          </div>
        </div>
        <div class="grid grid-cols-2 mt-3 gap-10">
          <div>
            <h5 class="text-xl">Saving Ratio:</h5>
            <h6 class="text-gray-500">percentage saved</h6>
          </div>
          <div>
           
          <p class="text-end text-xl">
                ${savings}
              </p>
          
          </div>
        </div>
        <div class="grid grid-cols-2 mt-3 gap-10">
          <div>
            <h5 class="text-xl">Burn Rate:</h5>
            <h6 class="text-gray-500">
              number of days you can live off the money saved
            </h6>
          </div>
          <div>
           
          <p class="text-end text-xl">
                {burnRate}
              </p>
           
          </div>
        </div>
      </div>
    </div>
  );
}
